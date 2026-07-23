export interface Block {
  id: string;
  type: string;
  data: any;
  order: number;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  blocks: Block[];
}