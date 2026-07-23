"use client";

interface DashboardCardProps {
  title: string;
  value: number | string;
  color?: "blue" | "green" | "yellow" | "red";
}

export default function DashboardCard({
  title,
  value,
  color = "blue",
}: DashboardCardProps) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-500",
    red: "bg-red-600",
  };

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-6 shadow-lg transition hover:shadow-xl hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${colors[color]}`}
        >
          <span className="text-2xl text-white">📊</span>
        </div>
      </div>
    </div>
  );
}