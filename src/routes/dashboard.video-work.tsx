import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle2, History, Loader2, Lock, PlayCircle, Video } from "lucide-react";
import { useState } from "react";

import { DashboardPlaceholder } from "@/components/dashboard/DashboardPlaceholder";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { supabase, type AppVideo } from "@/lib/supabase";
import { useProfile } from "@/hooks/useProfile";
import { useVideoViews } from "@/hooks/useVideoViews";

export const Route = createFileRoute("/dashboard/video-work")({
  head: () => ({
    meta: [{ title: "Video Work — SeDigitalHub" }],
  }),
  component: VideoWorkPage,
});

/**
 * Convert a shareable video link into an embeddable iframe URL. Handles the
 * common YouTube/Vimeo forms; anything else (already-embed links, direct file
 * URLs, other providers) is returned unchanged.
 */
function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      const m = u.pathname.match(/\/(embed|shorts)\/([\w-]+)/);
      if (m) return `https://www.youtube.com/embed/${m[2]}`;
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    // Not a parseable URL — fall through and use as-is.
  }
  return url;
}

function VideoCard({
  video,
  index,
  watched,
  onOpen,
}: {
  video: AppVideo;
  index: number;
  watched: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group block overflow-hidden rounded-3xl border border-border bg-card text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        {video.thumbnail_url ? (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="size-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center bg-brand/5">
            <Video className="size-8 text-brand" />
          </div>
        )}
        <span className="absolute inset-0 grid place-items-center bg-black/0 transition group-hover:bg-black/20">
          <PlayCircle className="size-12 text-white/0 transition group-hover:text-white/90" />
        </span>
        {watched ? (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-white shadow">
            <CheckCircle2 className="size-3" /> Watched
          </span>
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="truncate font-semibold text-ink">{video.title}</h3>
        {video.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-subtle">{video.description}</p>
        ) : null}
      </div>
    </motion.button>
  );
}

function VideoPlayerDialog({ video, onClose }: { video: AppVideo | null; onClose: () => void }) {
  return (
    <Dialog open={Boolean(video)} onOpenChange={(open) => (open ? null : onClose())}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-3xl">
        {video ? (
          <>
            <DialogTitle className="px-5 pt-5 text-base">{video.title}</DialogTitle>
            <div className="mt-3 aspect-video w-full bg-black">
              <iframe
                key={video.id}
                src={toEmbedUrl(video.video_url)}
                title={video.title}
                className="size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {video.description ? (
              <p className="px-5 pb-5 pt-4 text-sm text-subtle">{video.description}</p>
            ) : (
              <div className="pb-2" />
            )}
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function VideoWorkPage() {
  const { plan, isLoading: profileLoading } = useProfile();
  const { watchedIds, recordView } = useVideoViews();
  const [activeVideo, setActiveVideo] = useState<AppVideo | null>(null);

  const openPlayer = (video: AppVideo) => {
    recordView(video.id);
    setActiveVideo(video);
  };

  const videoLimit = plan?.videoLimit ?? 0;

  const {
    data: videos,
    isLoading: videosLoading,
    error,
  } = useQuery({
    queryKey: ["videos", videoLimit],
    enabled: videoLimit > 0,
    queryFn: async (): Promise<AppVideo[]> => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("sort_order", { ascending: true })
        .limit(videoLimit);
      if (error) throw error;
      return (data as AppVideo[]) ?? [];
    },
  });

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-7 animate-spin text-brand" aria-label="Loading" />
      </div>
    );
  }

  // No active plan → no videos until the admin activates a plan.
  if (!plan) {
    return (
      <DashboardPlaceholder
        icon={Lock}
        title="No active plan"
        description="You don't have an active plan yet. Once the admin activates your plan, your videos will appear here."
      />
    );
  }

  if (videosLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-7 animate-spin text-brand" aria-label="Loading" />
      </div>
    );
  }

  // `videos` table not created yet, or query failed — show a friendly state.
  if (error || !videos || videos.length === 0) {
    return (
      <DashboardPlaceholder
        icon={Video}
        title="No videos yet"
        description="Your assigned videos will appear here. On your current plan you can access the newest videos as they're added."
      />
    );
  }

  const watchedVideos = videos.filter((v) => watchedIds.has(v.id));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">Video Work</h2>
          <p className="mt-1 text-sm text-subtle">
            Your <span className="font-semibold text-brand">{plan.name}</span> plan gives you access
            to {plan.videoLimit} videos.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/12 px-3 py-1 text-xs font-bold text-brand">
          <Lock className="size-3" /> {videos.length} / {plan.videoLimit} unlocked
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <VideoCard
            key={v.id}
            video={v}
            index={i}
            watched={watchedIds.has(v.id)}
            onOpen={() => openPlayer(v)}
          />
        ))}
      </div>

      {/* Previous work — videos this client has already watched */}
      {watchedVideos.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <History className="size-5 text-brand" />
            <h3 className="text-lg font-bold tracking-tight text-ink">Previous work</h3>
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-subtle">
              {watchedVideos.length}
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {watchedVideos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} watched onOpen={() => openPlayer(v)} />
            ))}
          </div>
        </div>
      ) : null}

      <VideoPlayerDialog video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
