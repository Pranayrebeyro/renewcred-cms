"use client";

import { Block } from "@/types/block";

interface BlockTableProps {
  blocks: Block[];
  onEdit: (block: Block) => void;
  onDelete: (block: Block) => void;
}

export default function BlockTable({
  blocks,
  onEdit,
  onDelete,
}: BlockTableProps) {
  if (blocks.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-10 text-center">
        <h2 className="text-xl font-semibold text-white">
          No Blocks Found
        </h2>

        <p className="mt-2 text-gray-400">
          Click "Create Block" to add your first block.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-xl">
      <table className="min-w-full">
        <thead className="bg-slate-900">
          <tr>
            <th className="px-6 py-4 text-left text-white">
              Type
            </th>

            <th className="px-6 py-4 text-left text-white">
              Title
            </th>

            <th className="px-6 py-4 text-left text-white">
              Order
            </th>

            <th className="px-6 py-4 text-center text-white">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {blocks.map((block) => (
            <tr
              key={block.id}
              className="border-b border-slate-700 transition hover:bg-slate-700"
            >
              <td className="px-6 py-4">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                  {block.type}
                </span>
              </td>

              <td className="px-6 py-4 font-medium text-white">
                {block.title}
              </td>

              <td className="px-6 py-4 text-gray-300">
                {block.order}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(block)}
                    className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(block)}
                    className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}