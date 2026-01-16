import { Router } from "express";
import auth from "../middlewares/auth.js";
import z from "zod";
import prisma from "../lib/prisma.js";
import { contentSchema } from "../schemas/content.schema.js";
import { parseContentQuery } from "../utils/contentWhere.js";
import { mapContent } from "../utils/mapContent.js";

const contentRouter = Router();

contentRouter.post("/", auth, async (req, res) => {
    const parsedData = contentSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.issues[0].message,
        });
    }

    const { title, link, type, tags } = parsedData.data;
    const userId = req.userId!;
    const normalizedTags = [
        ...new Set(tags),
    ];

    try {
        await prisma.tag.createMany({
            data: normalizedTags.map((t) => ({ title: t })),
            skipDuplicates: true,
        });

        const tagIds = await prisma.tag.findMany({
            where: {
                title: {
                    in: tags,
                },
            },
            select: {
                id: true,
            },
        });

        await prisma.content.create({
            data: {
                title,
                link,
                type,
                userId,
                tags: {
                    connect: tagIds,
                },
            },
        });

        res.status(201).json({
            message: "Content created successfully",
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            res.status(409).json({
                message: "Content already exists with this link",
            });
        } else {
            res.status(500).json({
                message: "Failed to create content. Try again later.",
            });
        }
    }
});

contentRouter.get("/", auth, async (req, res) => {
    const userId = req.userId!;

    const { where } = parseContentQuery(userId, req.query);

    try {
        const contents = await prisma.content.findMany({
            where,
            include: {
                tags: {
                    select: {
                        title: true,
                    },
                },
            },
            omit: {
                userId: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            contents: contents.map(mapContent),
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch content. Try again later.",
        });
    }
});

contentRouter.put("/:contentId", auth, async (req, res) => {
    const parsedId = z.uuid().safeParse(req.params.contentId);

    if (!parsedId.success) {
        return res.status(400).json({
            message: "Invalid content id",
        });
    }

    const parsedData = contentSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.issues[0].message,
        });
    }

    const { title, link, type, tags } = parsedData.data;
    const userId = req.userId!;
    const normalizedTags = [
        ...new Set(tags),
    ];

    try {
        const content = await prisma.content.findFirst({
            where: {
                id: parsedId.data,
                userId,
            },
        });

        if (!content) {
            return res.status(404).json({
                message: "Content not found",
            });
        }

        await prisma.tag.createMany({
            data: normalizedTags.map((t) => ({ title: t })),
            skipDuplicates: true,
        });

        const tagIds = await prisma.tag.findMany({
            where: {
                title: {
                    in: tags,
                },
            },
            select: {
                id: true,
            },
        });

        await prisma.content.update({
            where: {
                id: parsedId.data,
            },
            data: {
                title,
                link,
                type,
                tags: {
                    set: tagIds,
                },
            },
        });

        res.status(201).json({
            message: "Content updated successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Failed to update content. Try again later.",
        });
    }
});

contentRouter.delete("/:contentId", auth, async (req, res) => {
    const parsedData = z.uuid().safeParse(req.params.contentId);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid content id",
        });
    }

    const userId = req.userId!;

    try {
        const content = await prisma.content.deleteMany({
            where: {
                id: parsedData.data,
                userId,
            },
        });

        if (content.count === 0) {
            return res.status(404).json({
                message: "Content not found",
            });
        }

        res.status(200).json({
            message: "Content deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete content. Try again later.",
        });
    }
});

export default contentRouter;
