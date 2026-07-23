import api from "./api";
import { Page } from "@/types/page";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class PageService {
  /**
   * Get all published pages
   */
  async getAllPages(): Promise<Page[]> {
    const response = await api.get<ApiResponse<Page[]>>("/public/pages");
    return response.data.data;
  }

  /**
   * Get a published page by slug
   */
  async getPageBySlug(slug: string): Promise<Page> {
    const response = await api.get<ApiResponse<Page>>(
      `/public/pages/${slug}`
    );

    return response.data.data;
  }
}

export const pageService = new PageService();