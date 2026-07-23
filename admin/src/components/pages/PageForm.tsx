"use client";

import { useEffect, useState } from "react";

interface Props {
  initialData?: {
    title: string;
    slug: string;
    description?: string;
  };
  onSubmit: (data: {
    title: string;
    slug: string;
    description: string;
  }) => void;
  loading?: boolean;
}

export default function PageForm({
  initialData,
  onSubmit,
  loading = false,
}: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] =useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSlug(initialData.slug);
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      slug,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="mb-2 block text-white font-medium">
          Title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-white font-medium">
          Slug
        </label>

        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-white font-medium">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save Page"}
      </button>

    </form>
  );
}