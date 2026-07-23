import api from "./api";
import {
  DashboardStats,
  RecentPage,
  RecentBlock,
} from "@/types/dashboard";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/pages/dashboard/stats");
  return response.data;
};

export const getRecentPages = async (): Promise<RecentPage[]> => {
  const response = await api.get("/pages");

  if (Array.isArray(response.data)) {
    return response.data.slice(0, 5);
  }

  return (response.data.data || []).slice(0, 5);
};

export const getRecentBlocks = async (): Promise<RecentBlock[]> => {
  const response = await api.get("/blocks");

  if (Array.isArray(response.data)) {
    return response.data.slice(0, 5);
  }

  return (response.data.data || []).slice(0, 5);
};