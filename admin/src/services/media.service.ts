import api from "./api";
import { Media } from "@/types/media";

export const getMedia = async (): Promise<Media[]> => {
  const response = await api.get("/media");
  return response.data.data;
};

export const uploadMedia = async (
  file: File
): Promise<Media> => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/media/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const deleteMedia = async (
  id: string
): Promise<void> => {
  await api.delete(`/media/${id}`);
};