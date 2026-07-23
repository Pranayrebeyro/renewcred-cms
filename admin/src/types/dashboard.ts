export interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalBlocks: number;
}

export interface RecentPage {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
}

export interface RecentBlock {
  id: string;
  title: string;
  type: string;
  pageTitle: string;
  order: number;
  createdAt: string;
}