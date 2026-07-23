"use client";

import { useEffect, useState } from "react";

import {
  getMedia,
  deleteMedia,
} from "@/services/media.service";

import { Media } from "@/types/media";

import MediaGrid from "@/components/media/MediaGrid";
import UploadModal from "@/components/media/UploadModal";
import DeleteMediaModal from "@/components/media/DeleteMediaModal";

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  const [uploadOpen, setUploadOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);

      const data = await getMedia();

      setMedia(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load media.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (item: Media) => {
    setSelectedMedia(item);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMedia) return;

    try {
      setDeleteLoading(true);

      await deleteMedia(selectedMedia.id);

      setDeleteOpen(false);
      setSelectedMedia(null);

      await loadMedia();
    } catch (error) {
      console.error(error);
      alert("Failed to delete image.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Media Library
          </h1>

          <p className="mt-2 text-gray-400">
            Upload and manage images for your CMS.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={loadMedia}
            className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Refresh
          </button>

          <button
            onClick={() => setUploadOpen(true)}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Upload Image
          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-xl bg-slate-900 p-6 shadow">

          <p className="text-gray-400">
            Total Images
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {media.length}
          </h2>

        </div>

        <div className="rounded-xl bg-slate-900 p-6 shadow">

          <p className="text-gray-400">
            Uploaded Files
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-400">
            {media.length}
          </h2>

        </div>

        <div className="rounded-xl bg-slate-900 p-6 shadow">

          <p className="text-gray-400">
            Storage
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-400">
            --
          </h2>

        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search images... (Coming Soon)"
        disabled
        className="mb-8 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white opacity-60"
      />

      {/* Loading */}

      {loading ? (

        <div className="flex h-96 items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

            <p className="text-lg text-white">
              Loading media...
            </p>

          </div>

        </div>

      ) : media.length === 0 ? (

        <div className="flex h-96 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700">

          <h2 className="text-3xl font-bold text-white">
            No Media Found
          </h2>

          <p className="mt-3 text-gray-400">
            Upload your first image to get started.
          </p>

          <button
            onClick={() => setUploadOpen(true)}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Upload First Image
          </button>

        </div>

      ) : (

        <MediaGrid
          media={media}
          onDelete={handleDeleteClick}
        />

      )}

      {/* Upload Modal */}

      <UploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSuccess={loadMedia}
      />

      {/* Delete Modal */}

      <DeleteMediaModal
        isOpen={deleteOpen}
        media={selectedMedia}
        loading={deleteLoading}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedMedia(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}