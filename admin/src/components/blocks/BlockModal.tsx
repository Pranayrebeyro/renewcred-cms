"use client";

import { ReactNode } from "react";

interface BlockModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function BlockModal({
  open,
  title,
  children,
  onClose,
}: BlockModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[70vh] overflow-y-auto p-6">
          {children}
        </div>

      </div>
    </div>
  );
}