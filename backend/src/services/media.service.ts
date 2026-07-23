import { PrismaClient, Media } from "@prisma/client";
import fs from "fs";
import path from "path";
import { CreateMediaInput } from "../types/media.types";

const prisma = new PrismaClient();

export class MediaService {
  async uploadMedia(data: CreateMediaInput): Promise<Media> {
    return prisma.media.create({
      data,
    });
  }

  async getAllMedia(): Promise<Media[]> {
    return prisma.media.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getMediaById(id: string): Promise<Media | null> {
    return prisma.media.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteMedia(id: string): Promise<Media> {
    const media = await prisma.media.findUnique({
      where: {
        id,
      },
    });

    if (!media) {
      throw new Error("Media not found");
    }

    const filePath = path.join(process.cwd(), "uploads", media.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return prisma.media.delete({
      where: {
        id,
      },
    });
  }
}

export const mediaService = new MediaService();