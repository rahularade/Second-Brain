import z from "zod";

export const CONTENT_TYPES = ["tweet", "video", "link"] as const;
export type ContentType =  typeof CONTENT_TYPES[number];

export const contentSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    link: z.url("Invalid link"),
    type: z.enum(CONTENT_TYPES),
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

export type ContentInput = z.infer<typeof contentSchema>
export interface Content extends ContentInput {
    id: string,
    createdAt: string,
    updatedAt: string
}