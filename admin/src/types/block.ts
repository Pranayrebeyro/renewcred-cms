export interface Block {
  id: string;
  pageId: string;

  type: string;

  title: string;

  content: string;

  order: number;

  createdAt: string;

  updatedAt: string;
}

export interface BlockPayload {
  pageId: string;

  type: string;

  title: string;

  content: string;

  order: number;
}