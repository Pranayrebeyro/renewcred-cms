import prisma from "../config/prisma";

export async function getDashboardStats() {
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

  const totalMedia = await prisma.media.count();

  return {
    totalPages,
    publishedPages,
    draftPages,
    totalBlocks,
    totalMedia,
  };
}