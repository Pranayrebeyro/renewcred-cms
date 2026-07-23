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
    <>
      <h2 className="mb-8 text-4xl font-bold text-gray-900">
        Dashboard Overview
      </h2>

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
    </>
  );
}