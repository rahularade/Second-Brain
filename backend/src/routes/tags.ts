import { Router } from "express";
import auth from "../middlewares/auth.js";
import prisma from "../lib/prisma.js";

const tagRouter = Router();

tagRouter.get("/", auth, async (req, res) => {
    try {
        const filter = (req.query.filter as string).trim() || "";
        const tags = await prisma.tag.findMany({
            where: {
                title: {
                    contains: filter,
                    mode: "insensitive"
                },
            },
            select: {
                id: true,
                title: true,
            },
            orderBy: {
                title: "asc",
            },
        });

        res.status(200).json({ tags });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tags. Try again later.",
        });
    }
});

export default tagRouter;
