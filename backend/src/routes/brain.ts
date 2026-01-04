import { Router } from "express";
import auth from "../middlewares/auth.js";
import prisma from "../lib/prisma.js";
import randomHash from "../utils/randomHash.js";
import { ContentType } from "../generated/prisma/enums.js";
import { parseContentQuery } from "../utils/parseQuery.js";

const brainRouter = Router();

brainRouter.post("/share", auth, async (req, res) => {
    const userId = req.userId!;
    const share = req.body.share as boolean;

    if (share) {
        try {
            const link = await prisma.shareLink.findUnique({
                where: {
                    userId,
                },
            });

            if (link) {
                return res.status(200).json({ hash: link.hash });
            }

            const hash = randomHash(9);
            await prisma.shareLink.create({
                data: {
                    hash,
                    userId,
                },
            });
            res.status(200).json({ hash });
        } catch (error) {
            res.status(500).json({
                message: "Failed to create sharelink. Try again later.",
            });
        }
    } else {
        try {
            const result = await prisma.shareLink.deleteMany({
                where: {
                    userId,
                },
            });
            if (result.count === 0) {
                return res
                    .status(404)
                    .json({ message: "No share link exists" });
            }
            res.status(200).json({
                message: "Sharelink deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete sharelink. Try again later.",
            });
        }
    }
});

brainRouter.get("/:hash", async (req, res) => {
    const hash = req.params.hash;
    const {search, type, page, limit, skip} = parseContentQuery(req.query)

    try {
        const link = await prisma.shareLink.findUnique({
            where: {
                hash,
            },
        });

        if (!link) {
            return res.status(404).json({
                message: "Share link is invalid or expired.",
            });
        }

        const where: any = {
            userId: link.userId,
            ...(search && {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            }),
            ...(type !== "ALL" && {
                type: type as ContentType,
            }),
        };

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
            skip,
            take: limit,
        });

        const total = await prisma.content.count({ where });

        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
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
export default brainRouter;
