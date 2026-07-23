export interface CreateMediaInput {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
}

export interface MediaResponse {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}