import { Router } from "express";
import auth from "../middlewares/auth.js";
import prisma from "../lib/prisma.js";
import randomHash from "../utils/randomHash.js";

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
            await prisma.shareLink.delete({
                where: {
                    userId,
                },
            });
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

        const contents = await prisma.content.findMany({
            where: {
                userId: link.userId,
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
export default brainRouter;
