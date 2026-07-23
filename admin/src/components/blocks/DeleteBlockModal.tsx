"use client";

interface DeleteBlockModalProps {
  open: boolean;
  title?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteBlockModal({
  open,
  title = "Delete Block",
  loading = false,
  onConfirm,
  onClose,
}: DeleteBlockModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="border-b border-slate-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>
        </div>

        {/* Body */}

        <div className="px-6 py-6">
          <p className="text-gray-300">
            Are you sure you want to delete this block?
          </p>

          <p className="mt-2 text-sm text-red-400">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-700 px-6 py-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-600 px-5 py-2 text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}