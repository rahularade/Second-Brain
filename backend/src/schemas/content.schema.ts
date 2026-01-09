import z from "zod";
import { ContentType } from "../generated/prisma/enums.js";

export const contentSchema = z.object({
    title: z
        .string({
            error: (title) =>
                title.input === undefined
                    ? "Title is required."
                    : "Invalid title.",
        })
        .trim()
        .min(3, "Title must be at least 3 characters."),
    link: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
        error: (link) =>
            link.input === undefined ? "Link is required." : "Invalid link.",
    }),
    type: z
        .string({
            error: (type) =>
                type.input === undefined
                    ? "Type is required."
                    : "Invalid content type.",
        })
        .toUpperCase()
        .pipe(z.enum(ContentType, "Invalid content type.")),
    tags: z
        .array(
            z
                .string("Invalid tag name.")
                .trim()
                .min(2, "Tag must be at least 2 characters.")
                .max(20, "Tag is too long (maximum 20 characters).")
                .toLowerCase(),
            {
                error: (tags) =>
                    tags.input === undefined
                        ? "Tags is required."
                        : "Invalid tags.",
            }
        )
        .min(1, "At least 1 tag is required.")
        .max(10, "Maximum 10 tags allowed."),
});
