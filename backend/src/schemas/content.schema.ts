import z from "zod";
import { ContentType } from "../generated/prisma/enums.js";


export const contentSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    link: z.url("Invalid link"),
    type: z
        .string()
        .toUpperCase()
        .pipe(z.enum(ContentType, "Invalid content type")),
    tags: z
        .array(
            z
                .string("Invalid tag name")
                .trim()
                .min(3, "Invalid tag name")
                .max(20, "Tag name too long")
                .toLowerCase(),
            "Invalid tag name"
        )
        .max(10, "Maximum 10 tags allowed"),
});