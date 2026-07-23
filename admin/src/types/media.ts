export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: Media;
}

export interface MediaResponse {
  success: boolean;
  data: Media[];
}