"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const pageTitle = (() => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/pages":
        return "Pages";
      case "/dashboard/blocks":
        return "Blocks";
      case "/dashboard/media":
        return "Media Library";
      case "/dashboard/settings":
        return "Settings";
      default:
        return "RenewCred CMS";
    }
  })();

  return (
    <header className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-8 py-5">
      <div>
        <h1 className="text-2xl font-bold text-white">
          {pageTitle}
        </h1>

        <p className="text-sm text-slate-400">
          RenewCred CMS Admin Panel
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-white">
            Administrator
          </p>

          <p className="text-sm text-slate-400">
            admin@renewcred.com
          </p>
        </div>

        <button
          className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}