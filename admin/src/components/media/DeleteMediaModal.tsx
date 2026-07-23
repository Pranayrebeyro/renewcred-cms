"use client";

import { Media } from "@/types/media";

interface DeleteMediaModalProps {
  isOpen: boolean;
  media: Media | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteMediaModal({
  isOpen,
  media,
  loading,
  onClose,
  onConfirm,
}: DeleteMediaModalProps) {
  if (!isOpen || !media) return null;

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${media.url}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">

        {/* Header */}

        <div className="border-b border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white">
            Delete Image
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            This action is permanent and cannot be undone.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">

          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
            <img
              src={imageUrl}
              alt={media.originalName}
              className="h-48 w-full object-cover"
            />
          </div>

          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">

            <p className="text-sm text-gray-300">
              You are about to permanently delete:
            </p>

            <p className="mt-2 break-all font-semibold text-red-400">
              {media.originalName}
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-400">

              <div className="flex justify-between">
                <span>Size</span>
                <span>{(media.size / 1024).toFixed(2)} KB</span>
              </div>

              <div className="flex justify-between">
                <span>Uploaded</span>
                <span>
                  {new Date(media.createdAt).toLocaleDateString()}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-700 p-6">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg bg-slate-600 px-5 py-2 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Image"}
          </button>

        </div>

      </div>
    </div>
  );
}