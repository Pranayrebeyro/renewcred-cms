"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Boxes,
  Image,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Pages",
    href: "/dashboard/pages",
    icon: FileText,
  },
  {
    name: "Blocks",
    href: "/dashboard/blocks",
    icon: Boxes,
  },
  {
    name: "Media",
    href: "/dashboard/media",
    icon: Image,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-white">
      {/* Logo */}
      <div className="border-b border-slate-800 p-8">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          RenewCred CMS
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Content Management System
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-5 py-4 text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-6">
        <p className="text-center text-sm text-slate-500">
          RenewCred CMS v1.0
        </p>
      </div>
    </aside>
  );
}