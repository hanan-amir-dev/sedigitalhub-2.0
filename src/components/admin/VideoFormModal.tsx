import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateVideo, useUpdateVideo } from "@/hooks/useVideos";
import type { AppVideo } from "@/lib/supabase";

/**
 * Add/edit a video. When `video` is null the modal is in "add" mode and
 * defaults sort_order to `nextSortOrder` (max existing + 1).
 */
export function VideoFormModal({
  video,
  nextSortOrder,
  open,
  onOpenChange,
}: {
  video: AppVideo | null;
  nextSortOrder: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const createVideo = useCreateVideo();
  const updateVideo = useUpdateVideo();
  const isEdit = Boolean(video);

  const [form, setForm] = useState({
    title: "",
    video_url: "",
    description: "",
    thumbnail_url: "",
    sort_order: "0",
  });
  const [error, setError] = useState<string | null>(null);

  // Sync form when opening for a specific video (or a fresh add).
  useEffect(() => {
    if (!open) return;
    if (video) {
      setForm({
        title: video.title ?? "",
        video_url: video.video_url ?? "",
        description: video.description ?? "",
        thumbnail_url: video.thumbnail_url ?? "",
        sort_order: String(video.sort_order ?? 0),
      });
    } else {
      setForm({
        title: "",
        video_url: "",
        description: "",
        thumbnail_url: "",
        sort_order: String(nextSortOrder),
      });
    }
    setError(null);
  }, [open, video, nextSortOrder]);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    setError(null);
    if (!form.title.trim() || !form.video_url.trim()) {
      setError("Title and video link are required.");
      return;
    }
    const order = Number(form.sort_order);
    if (Number.isNaN(order)) {
      setError("Order must be a number.");
      return;
    }

    const values = {
      title: form.title.trim(),
      video_url: form.video_url.trim(),
      description: form.description.trim() || null,
      thumbnail_url: form.thumbnail_url.trim() || null,
      sort_order: order,
    };

    try {
      if (video) {
        await updateVideo.mutateAsync({ id: video.id, values });
      } else {
        await createVideo.mutateAsync(values);
      }
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the video.");
    }
  };

  const pending = createVideo.isPending || updateVideo.isPending;

  const fields: Array<{
    key: keyof typeof form;
    label: string;
    type?: string;
    placeholder?: string;
  }> = [
    { key: "title", label: "Title", placeholder: "Intro video" },
    { key: "video_url", label: "Video link", placeholder: "https://…" },
    { key: "thumbnail_url", label: "Thumbnail URL (optional)", placeholder: "https://…" },
    { key: "description", label: "Description (optional)" },
    { key: "sort_order", label: "Order", type: "number" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit video" : "Add video"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
            >
              {error}
            </div>
          ) : null}

          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label htmlFor={`video-${f.key}`}>{f.label}</Label>
              <Input
                id={`video-${f.key}`}
                type={f.type ?? "text"}
                value={form[f.key]}
                onChange={set(f.key)}
                placeholder={f.placeholder}
              />
            </div>
          ))}

          <p className="text-xs text-subtle">
            Lower order is visible to all plans; higher order unlocks on bigger plans.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={pending}
            className="gap-2 rounded-full bg-brand-gradient text-white hover:opacity-95"
          >
            {pending ? <Loader2 className="size-4 animate-spin" /> : null}
            {isEdit ? "Save changes" : "Add video"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
