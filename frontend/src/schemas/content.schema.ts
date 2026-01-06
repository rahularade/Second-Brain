import z from "zod";

export const contentSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    link: z.url("Invalid link"),
    type: z.enum(["tweet", "video", "link"]),
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

export type ContentType = z.infer<typeof contentSchema>