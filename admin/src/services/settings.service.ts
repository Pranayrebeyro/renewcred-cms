import api from "./api";
import { Settings } from "@/types/settings";

export async function getSettings(): Promise<Settings> {
  const response = await api.get("/settings");
  return response.data;
}

export async function updateSettings(
  data: Partial<Settings>
): Promise<Settings> {
  const response = await api.put("/settings", data);
  return response.data.settings;
}