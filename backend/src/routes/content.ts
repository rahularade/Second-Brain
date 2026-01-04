import { Router } from "express";
import auth from "../middlewares/auth.js";
import z from "zod";
import { ContentType } from "../generated/prisma/enums.js";
import prisma from "../lib/prisma.js";

const contentRouter = Router();

const contentSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    link: z.url("Invalid link"),
    type: z
        .string()
        .toUpperCase()
        .pipe(z.enum(ContentType, "Invalid content type")),
    tags: z.array(z.string("Invalid tag name").toLowerCase(), "Invalid tag name"),
});

contentRouter.post("/", auth, async (req, res) => {
    const parsedData = contentSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.issues[0].message,
        });
    }

    const { title, link, type, tags } = parsedData.data;
    const userId = req.userId!;

    try {
        await prisma.tag.createMany({
            data: tags.map((t) => ({ title: t })),
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

    try {
        const contents = await prisma.content.findMany({
            where: {
                userId,
            },
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
        });

        res.status(200).json({
            contents: contents.map((c) => ({
                ...c,
                type: c.type.toLowerCase(),
                tags: c.tags.map((t) => t.title),
            })),
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch content. Try again later.",
        });
    }
});

contentRouter.delete("/", auth, async (req, res) => {
    const parsedData = z.uuid().safeParse(req.body.contentId);

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
