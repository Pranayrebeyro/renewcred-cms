"use client";

import { useEffect, useState } from "react";

import {
  getPages,
  createPage,
  updatePage,
  deletePage,
  publishPage,
} from "@/services/page.service";

import PageForm from "@/components/pages/PageForm";
import PageModal from "@/components/pages/PageModal";

import { Page } from "@/types/page";

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

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

  const handleSubmit = async (data: {
    title: string;
    slug: string;
    description: string;
  }) => {
    try {
      setLoading(true);

      if (editingPage) {
        await updatePage(editingPage.id, data);
      } else {
        await createPage(data);
      }

      await loadPages();

      setEditingPage(null);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save page.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPage(null);
    setOpenModal(true);
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this page?"
    );

    if (!confirmed) return;

    try {
      await deletePage(id);
      await loadPages();

      alert("Page deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete page.");
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishPage(id);

      await loadPages();

      alert("Page published successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to publish page.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Pages
          </h1>

          <p className="mt-2 text-gray-300">
            Manage your CMS pages.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Create Page
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-xl">
        <table className="min-w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left text-white">
                Title
              </th>

              <th className="px-6 py-4 text-left text-white">
                Slug
              </th>

              <th className="px-6 py-4 text-left text-white">
                Status
              </th>

              <th className="px-6 py-4 text-center text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-gray-400"
                >
                  No pages found.
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-slate-700 hover:bg-slate-700 transition"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {page.title}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {page.slug}
                  </td>

                  <td className="px-6 py-4">
                    {page.isPublished ? (
                      <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-semibold text-white">
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(page)}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      {!page.isPublished && (
                        <button
                          onClick={() => handlePublish(page.id)}
                          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                          Publish
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(page.id)}
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PageModal
        open={openModal}
        title={editingPage ? "Edit Page" : "Create Page"}
        onClose={() => {
          setEditingPage(null);
          setOpenModal(false);
        }}
      >
        <PageForm
          initialData={
            editingPage
              ? {
                  title: editingPage.title,
                  slug: editingPage.slug,
                  description: editingPage.description || "",
                }
              : undefined
          }
          onSubmit={handleSubmit}
          loading={loading}
        />
      </PageModal>
    </div>
  );
}