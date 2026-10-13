import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, type AppVideo, type VideoInsert } from "@/lib/supabase";

const VIDEOS_KEY = ["admin", "videos"];

/** Admin-side: list all videos in display order. */
export function useVideos() {
  return useQuery({
    queryKey: VIDEOS_KEY,
    queryFn: async (): Promise<AppVideo[]> => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data as AppVideo[]) ?? [];
    },
  });
}

export function useCreateVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: VideoInsert) => {
      const { error } = await supabase.from("videos").insert(values);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VIDEOS_KEY });
    },
  });
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<VideoInsert> }) => {
      const { error } = await supabase.from("videos").update(values).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VIDEOS_KEY });
    },
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("videos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VIDEOS_KEY });
    },
  });
}
