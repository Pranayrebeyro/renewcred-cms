import api from "./api";
import { BlockPayload } from "@/types/block";

export const getBlocks = async () => {
  const response = await api.get("/blocks");
  return response.data;
};

export const getBlock = async (id: string) => {
  const response = await api.get(`/blocks/${id}`);
  return response.data;
};

export const createBlock = async (data: BlockPayload) => {
  const response = await api.post("/blocks", data);
  return response.data;
};

export const updateBlock = async (
  id: string,
  data: BlockPayload
) => {
  const response = await api.put(`/blocks/${id}`, data);
  return response.data;
};

export const deleteBlock = async (id: string) => {
  const response = await api.delete(`/blocks/${id}`);
  return response.data;
};