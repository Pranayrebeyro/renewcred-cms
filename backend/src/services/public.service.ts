import prisma from "../config/prisma";

export const getPublishedPages = async () => {
  return prisma.page.findMany({
    where: {
      isPublished: true,
    },
    include: {
      blocks: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPublishedPageBySlug = async (slug: string) => {
  return prisma.page.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      blocks: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};