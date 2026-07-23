"use client";

import { useState } from "react";
import { Media } from "@/types/media";

interface MediaCardProps {
  media: Media;
  onDelete: (media: Media) => void;
}

export default function MediaCard({
  media,
  onDelete,
}: MediaCardProps) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${media.url}`;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;

    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;

    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Image */}

      <div className="relative aspect-video overflow-hidden bg-slate-900">

        {imageError ? (
          <div className="flex h-full items-center justify-center text-5xl">
            🖼️
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={media.originalName}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}

      </div>

      {/* Content */}

      <div className="space-y-3 p-4">

        <div>
          <h3
            className="truncate text-lg font-semibold text-white"
            title={media.originalName}
          >
            {media.originalName}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {formatFileSize(media.size)}
          </p>

          <p className="text-xs text-gray-500">
            Uploaded{" "}
            {new Date(media.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}

        <div className="grid grid-cols-2 gap-2">

          <button
            onClick={copyUrl}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            {copied ? "Copied!" : "Copy URL"}
          </button>

          <button
            onClick={() => window.open(imageUrl, "_blank")}
            className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
          >
            Preview
          </button>

          <a
            href={imageUrl}
            download
            className="rounded-lg bg-green-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-green-700"
          >
            Download
          </a>

          <button
            onClick={() => onDelete(media)}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}