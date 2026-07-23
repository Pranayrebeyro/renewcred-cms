"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { uploadMedia } from "@/services/media.service";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  onSuccess,
}: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!isOpen) return null;

  const resetForm = () => {
    setFile(null);
    setPreview(null);
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFile = e.target.files[0];

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(2)} KB`;
    }

    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      await uploadMedia(file);

      resetForm();

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-slate-800 shadow-2xl">

        <div className="border-b border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white">
            Upload Image
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Supported formats: JPG, PNG, WEBP (Max 5 MB)
          </p>
        </div>

        <div className="space-y-6 p-6">

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
          />

          {preview && (
            <div className="overflow-hidden rounded-xl border border-slate-700">
              <img
                src={preview}
                alt="Preview"
                className="h-64 w-full object-cover"
              />
            </div>
          )}

          {file && (
            <div className="rounded-xl bg-slate-900 p-4 text-sm text-gray-300">

              <div className="flex justify-between">
                <span>File Name</span>
                <span className="font-medium text-white">
                  {file.name}
                </span>
              </div>

              <div className="mt-2 flex justify-between">
                <span>File Size</span>
                <span className="font-medium text-white">
                  {formatFileSize(file.size)}
                </span>
              </div>

              <div className="mt-2 flex justify-between">
                <span>File Type</span>
                <span className="font-medium text-white">
                  {file.type}
                </span>
              </div>

            </div>
          )}

        </div>

        <div className="flex justify-end gap-3 border-t border-slate-700 p-6">

          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg bg-slate-600 px-5 py-2 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>

        </div>

      </div>
    </div>
  );
}