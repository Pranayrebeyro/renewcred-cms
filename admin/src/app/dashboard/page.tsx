"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboard.service";
import StatCard from "@/components/dashboard/StatCard";
import { DashboardStats } from "@/types/dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalBlocks: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await getDashboardStats();
        setStats(stats);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back! Here's an overview of your CMS.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Pages"
          value={stats.totalPages}
        />

        <StatCard
          title="Published Pages"
          value={stats.publishedPages}
        />

        <StatCard
          title="Draft Pages"
          value={stats.draftPages}
        />

        <StatCard
          title="Total Blocks"
          value={stats.totalBlocks}
        />
      </div>
    </div>
  );
}