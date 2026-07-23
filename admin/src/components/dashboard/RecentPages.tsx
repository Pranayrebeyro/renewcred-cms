"use client";

import { RecentPage } from "@/types/dashboard";

interface RecentPagesProps {
  pages: RecentPage[];
}

export default function RecentPages({
  pages,
}: RecentPagesProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 shadow-lg">
      {/* Header */}
      <div className="border-b border-slate-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Recent Pages
        </h2>
      </div>

      {/* Empty State */}
      {pages.length === 0 ? (
        <div className="p-8 text-center text-gray-400">
          No pages found.
        </div>
      ) : (
        <table className="min-w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                Title
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                Slug
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-300">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {pages.map((page) => (
              <tr
                key={page.id}
                className="border-b border-slate-700 hover:bg-slate-700 transition"
              >
                <td className="px-6 py-4 text-white">
                  {page.title}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {page.slug}
                </td>

                <td className="px-6 py-4 text-center">
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}