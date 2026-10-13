import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

/**
 * Tracks which videos the signed-in client has watched (the "previous work").
 * Returns the set of watched video ids and a `recordView` mutation to call when
 * a video is opened.
 */
export function useVideoViews() {
  const { user } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const key = ["video-views", userId];

  const query = useQuery({
    queryKey: key,
    enabled: Boolean(userId),
    queryFn: async (): Promise<Set<string>> => {
      const { data, error } = await supabase
        .from("video_views")
        .select("video_id")
        .eq("user_id", userId as string);
      if (error) throw error;
      return new Set((data ?? []).map((r) => r.video_id as string));
    },
  });

  const recordView = useMutation({
    mutationFn: async (videoId: string) => {
      if (!userId) return;
      const { error } = await supabase
        .from("video_views")
        .upsert(
          { user_id: userId, video_id: videoId },
          { onConflict: "user_id,video_id", ignoreDuplicates: true },
        );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });

  return {
    watchedIds: query.data ?? new Set<string>(),
    isLoading: query.isLoading,
    recordView: (videoId: string) => recordView.mutate(videoId),
  };
}
