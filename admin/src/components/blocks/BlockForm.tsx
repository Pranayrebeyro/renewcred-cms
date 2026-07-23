"use client";

import { useEffect, useState } from "react";

import { Page } from "@/types/page";
import { BlockPayload } from "@/types/block";
import { getPages } from "@/services/page.service";
import { BLOCK_TYPES } from "@/utils/blockTypes";

interface Props {
  initialData?: BlockPayload;
  onSubmit: (data: BlockPayload) => void;
  loading?: boolean;
}

export default function BlockForm({
  initialData,
  onSubmit,
  loading = false,
}: Props) {
  const [pages, setPages] = useState<Page[]>([]);

  const [pageId, setPageId] = useState("");
  const [type, setType] = useState("Hero");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(1);

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    if (initialData) {
      setPageId(initialData.pageId);
      setType(initialData.type);
      setTitle(initialData.title);
      setContent(initialData.content);
      setOrder(initialData.order);
    }
  }, [initialData]);

  const loadPages = async () => {
    try {
      const response = await getPages();

      if (Array.isArray(response)) {
        setPages(response);
      } else {
        setPages(response.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pageId) {
      alert("Please select a page.");
      return;
    }

    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!content.trim()) {
      alert("Content is required.");
      return;
    }

    onSubmit({
      pageId,
      type,
      title,
      content,
      order,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Page */}

      <div>
        <label className="mb-2 block font-medium text-white">
          Select Page
        </label>

        <select
          value={pageId}
          onChange={(e) => setPageId(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none"
          required
        >
          <option value="">
            Choose Page
          </option>

          {pages.map((page) => (
            <option
              key={page.id}
              value={page.id}
            >
              {page.title}
            </option>
          ))}
        </select>
      </div>

      {/* Block Type */}

      <div>
        <label className="mb-2 block font-medium text-white">
          Block Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none"
        >
          {BLOCK_TYPES.map((blockType) => (
            <option
              key={blockType}
              value={blockType}
            >
              {blockType}
            </option>
          ))}
        </select>
      </div>

      {/* Title + Order */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-white">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none"
            placeholder="Enter block title"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-white">
            Display Order
          </label>

          <input
            type="number"
            min={1}
            value={order}
            onChange={(e) =>
              setOrder(Number(e.target.value))
            }
            className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Content */}

      <div>
        <label className="mb-2 block font-medium text-white">
          Content
        </label>

        <textarea
          rows={8}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Enter block content..."
          className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      {/* Preview */}

      <div className="rounded-lg border border-slate-700 bg-slate-900 p-5">
        <h3 className="mb-3 text-lg font-semibold text-white">
          Live Preview
        </h3>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">
            {title || "Block Title"}
          </h2>

          <p className="whitespace-pre-line text-gray-300">
            {content || "Block content will appear here..."}
          </p>
        </div>
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Block"}
      </button>
    </form>
  );
}