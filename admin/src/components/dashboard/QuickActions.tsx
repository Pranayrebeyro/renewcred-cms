"use client";

import Link from "next/link";

export default function QuickActions() {
  const actions = [
    {
      title: "Create Page",
      description: "Add a new CMS page",
      href: "/pages",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: "📄",
    },
    {
      title: "Create Block",
      description: "Add a new content block",
      href: "/blocks",
      color: "bg-green-600 hover:bg-green-700",
      icon: "🧩",
    },
    {
      title: "Manage Pages",
      description: "View and edit pages",
      href: "/pages",
      color: "bg-purple-600 hover:bg-purple-700",
      icon: "📚",
    },
    {
      title: "Manage Blocks",
      description: "View and edit blocks",
      href: "/blocks",
      color: "bg-orange-600 hover:bg-orange-700",
      icon: "⚙️",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className={`rounded-lg p-5 text-white transition ${action.color}`}
          >
            <div className="text-3xl">
              {action.icon}
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              {action.title}
            </h3>

            <p className="mt-1 text-sm text-gray-100">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}