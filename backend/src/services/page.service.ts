import prisma from "../config/prisma";

class PageService {
  // Create Page
  async createPage(data: {
    title: string;
    slug: string;
    description?: string;
  }) {
    const existingPage = await prisma.page.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingPage) {
      throw new Error("Slug already exists");
    }

    return prisma.page.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
      },
    });
  }

  // Get All Pages
  async getAllPages() {
    return prisma.page.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Get Single Page
  async getPageById(id: string) {
    const page = await prisma.page.findUnique({
      where: {
        id,
      },
      include: {
        blocks: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    return page;
  }

  // Update Page
  async updatePage(
    id: string,
    data: {
      title?: string;
      slug?: string;
      description?: string;
    }
  ) {
    const page = await prisma.page.findUnique({
      where: {
        id,
      },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    if (data.slug && data.slug !== page.slug) {
      const existingPage = await prisma.page.findUnique({
        where: {
          slug: data.slug,
        },
      });

      if (existingPage) {
        throw new Error("Slug already exists");
      }
    }

    return prisma.page.update({
      where: {
        id,
      },
      data,
    });
  }

  // Delete Page
  async deletePage(id: string) {
    const page = await prisma.page.findUnique({
      where: {
        id,
      },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    await prisma.page.delete({
      where: {
        id,
      },
    });

    return {
      message: "Page deleted successfully",
    };
  }

  // Publish / Unpublish Page
  async publishPage(id: string) {
    const page = await prisma.page.findUnique({
      where: {
        id,
      },
    });

    if (!page) {
      throw new Error("Page not found");
    }

    return prisma.page.update({
      where: {
        id,
      },
      data: {
        isPublished: !page.isPublished,
      },
    });
  }

  // Dashboard Statistics
  async getDashboardStats() {
    const totalPages = await prisma.page.count();

    const publishedPages = await prisma.page.count({
      where: {
        isPublished: true,
      },
    });

    const draftPages = await prisma.page.count({
      where: {
        isPublished: false,
      },
    });

    const totalBlocks = await prisma.block.count();

    return {
      totalPages,
      publishedPages,
      draftPages,
      totalBlocks,
    };
  }
}

export default new PageService();