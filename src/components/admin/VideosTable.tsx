import { useMemo, useState } from "react";
import { AlertCircle, Loader2, Pencil, Plus, Trash2, Video as VideoIcon } from "lucide-react";

import { VideoFormModal } from "./VideoFormModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVideos, useDeleteVideo } from "@/hooks/useVideos";
import type { AppVideo } from "@/lib/supabase";

export function VideosTable() {
  const { data: videos, isLoading, error } = useVideos();
  const deleteVideo = useDeleteVideo();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AppVideo | null>(null);

  const nextSortOrder = useMemo(() => {
    if (!videos || videos.length === 0) return 0;
    return Math.max(...videos.map((v) => v.sort_order ?? 0)) + 1;
  }, [videos]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (video: AppVideo) => {
    setEditing(video);
    setModalOpen(true);
  };
  const handleDelete = (video: AppVideo) => {
    if (window.confirm(`Delete "${video.title}"? This can't be undone.`)) {
      deleteVideo.mutate(video.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">Videos</h2>
          <p className="mt-0.5 text-sm text-subtle">
            Lower order is visible to all plans; higher order unlocks on bigger plans.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="gap-2 rounded-full bg-brand-gradient text-white hover:opacity-95"
        >
          <Plus className="size-4" /> Add video
        </Button>
      </div>

      <div className="isolate overflow-hidden rounded-none border border-border bg-card shadow-card">
        {error ? (
          <div className="flex items-center gap-3 px-6 py-10 text-sm text-destructive">
            <AlertCircle className="size-5 shrink-0" />
            <div>
              <p className="font-semibold">Couldn't load videos.</p>
              <p className="text-destructive/80">{error.message}</p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-7 animate-spin text-brand" aria-label="Loading" />
          </div>
        ) : !videos || videos.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-subtle">
            No videos yet. Add your first one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-surface/60 hover:bg-surface/60">
                <TableHead className="w-16 text-xs font-semibold uppercase tracking-wider text-subtle">
                  Order
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-subtle">
                  Video
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-subtle">
                  Link
                </TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-subtle">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video) => (
                <TableRow
                  key={video.id}
                  className="border-border transition-colors hover:bg-surface/50"
                >
                  <TableCell className="font-semibold tabular-nums text-ink">
                    {video.sort_order}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-surface">
                        {video.thumbnail_url ? (
                          <img
                            src={video.thumbnail_url}
                            alt={video.title}
                            className="size-full object-cover"
                          />
                        ) : (
                          <VideoIcon className="size-4 text-brand" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-ink">{video.title}</div>
                        {video.description ? (
                          <div className="truncate text-xs text-subtle">{video.description}</div>
                        ) : null}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[16rem]">
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-sm text-brand hover:underline"
                    >
                      {video.video_url}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(video)}
                        className="gap-1.5 rounded-full text-subtle hover:text-ink"
                      >
                        <Pencil className="size-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(video)}
                        aria-label="Delete video"
                        className="rounded-full text-subtle hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <VideoFormModal
        video={editing}
        nextSortOrder={nextSortOrder}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
