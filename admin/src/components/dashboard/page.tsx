"use client";

import { useEffect, useState } from "react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentPages from "@/components/dashboard/RecentPages";
import RecentBlocks from "@/components/dashboard/RecentBlocks";
import QuickActions from "@/components/dashboard/QuickActions";

import {
  getDashboardStats,
  getRecentPages,
  getRecentBlocks,
} from "@/services/dashboard.service";

import {
  DashboardStats,
  RecentPage,
  RecentBlock,
} from "@/types/dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalBlocks: 0,
  });

  const [pages, setPages] = useState<RecentPage[]>([]);
  const [blocks, setBlocks] = useState<RecentBlock[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [statsData, pagesData, blocksData] =
        await Promise.all([
          getDashboardStats(),
          getRecentPages(),
          getRecentBlocks(),
        ]);

      setStats(statsData);
      setPages(pagesData);
      setBlocks(blocksData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-xl text-white">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome to the RenewCred CMS Admin Dashboard
        </p>
      </div>

      {/* Statistics */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Total Pages"
          value={stats.totalPages}
          color="blue"
        />

        <DashboardCard
          title="Published Pages"
          value={stats.publishedPages}
          color="green"
        />

        <DashboardCard
          title="Draft Pages"
          value={stats.draftPages}
          color="yellow"
        />

        <DashboardCard
          title="Total Blocks"
          value={stats.totalBlocks}
          color="red"
        />

      </div>

      {/* Tables */}

      <div className="mb-8 grid gap-6 xl:grid-cols-2">

        <RecentPages pages={pages} />

        <RecentBlocks blocks={blocks} />

      </div>

      {/* Quick Actions */}

      <QuickActions />

    </div>
  );
}