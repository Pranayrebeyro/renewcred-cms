"use client";

import { RecentBlock } from "@/types/dashboard";

interface RecentBlocksProps {
  blocks: RecentBlock[];
}

export default function RecentBlocks({
  blocks,
}: RecentBlocksProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 shadow-lg">
      {/* Header */}
      <div className="border-b border-slate-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Recent Blocks
        </h2>
      </div>

      {/* Empty State */}
      {blocks.length === 0 ? (
        <div className="p-8 text-center text-gray-400">
          No blocks found.
        </div>
      ) : (
        <table className="min-w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                Title
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                Type
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                Page
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-300">
                Order
              </th>
            </tr>
          </thead>

          <tbody>
            {blocks.map((block) => (
              <tr
                key={block.id}
                className="border-b border-slate-700 hover:bg-slate-700 transition"
              >
                <td className="px-6 py-4 text-white">
                  {block.title}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    {block.type}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {block.pageTitle}
                </td>

                <td className="px-6 py-4 text-center text-gray-300">
                  {block.order}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}