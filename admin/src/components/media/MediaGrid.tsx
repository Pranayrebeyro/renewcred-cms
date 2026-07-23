"use client";

import { Media } from "@/types/media";
import MediaCard from "./MediaCard";

interface MediaGridProps {
  media: Media[];
  onDelete: (media: Media) => void;
}

export default function MediaGrid({
  media,
  onDelete,
}: MediaGridProps) {
  if (media.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 px-8 py-20 text-center shadow-lg">
        <div className="mb-6 text-7xl">🖼️</div>

        <h2 className="text-3xl font-bold text-white">
          No Images Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-gray-400">
          Your media library is empty.
          Upload your first image to start building your CMS.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Grid */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
        "
      >
        {media.map((item) => (
          <MediaCard
            key={item.id}
            media={item}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between rounded-xl bg-slate-900 px-6 py-4">

        <p className="text-gray-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {media.length}
          </span>{" "}
          image{media.length !== 1 ? "s" : ""}
        </p>

        <p className="text-sm text-gray-500">
          CMS Media Library
        </p>

      </div>
    </>
  );
}