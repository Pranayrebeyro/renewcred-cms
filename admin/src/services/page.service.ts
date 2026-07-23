import api from "./api";

export interface PagePayload {
  title: string;
  slug: string;
  description?: string;
}

export const getPages = async () => {
  const response = await api.get("/pages");
  return response.data;
};

export const getPage = async (id: string) => {
  const response = await api.get(`/pages/${id}`);
  return response.data;
};

export const createPage = async (data: PagePayload) => {
  const response = await api.post("/pages", data);
  return response.data;
};

export const updatePage = async (
  id: string,
  data: PagePayload
) => {
  const response = await api.put(`/pages/${id}`, data);
  return response.data;
};

export const deletePage = async (id: string) => {
  const response = await api.delete(`/pages/${id}`);
  return response.data;
};

export const publishPage = async (id: string) => {
  const response = await api.patch(`/pages/${id}/publish`);
  return response.data;
};