import prisma from "../config/prisma";

class BlockService {
    async createBlock(data: {
        pageId: string;
        type: string;
        data: any;
        order: number;
    }) {
        const page = await prisma.page.findUnique({
            where: {
                id: data.pageId,
            },
        });

        if (!page) {
            throw new Error("Page not found");
        }

        const block = await prisma.block.create({
            data: {
                pageId: data.pageId,
                type: data.type,
                data: data.data,
                order: data.order,
            },
        });

        return block;
    }

    async getBlocks(pageId: string) {
        return prisma.block.findMany({
            where: {
                pageId,
            },
            orderBy: {
                order: "asc",
            },
        });
    }

    async updateBlock(
        id: string,
        data: {
            type?: string;
            data?: any;
            order?: number;
        }
    ) {
        const block = await prisma.block.findUnique({
            where: {
                id,
            },
        });

        if (!block) {
            throw new Error("Block not found");
        }

        return prisma.block.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteBlock(id: string) {
        const block = await prisma.block.findUnique({
            where: {
                id,
            },
        });

        if (!block) {
            throw new Error("Block not found");
        }

        await prisma.block.delete({
            where: {
                id,
            },
        });

        return {
            message: "Block deleted successfully",
        };
    }

    async reorderBlocks(
        blocks: {
            id: string;
            order: number;
        }[]
    ) {
        const updates = blocks.map((block) =>
            prisma.block.update({
                where: {
                    id: block.id,
                },
                data: {
                    order: block.order,
                },
            })
        );

        return prisma.$transaction(updates);
    }
}

export default new BlockService();