import z from "zod";

export const CONTENT_TYPES = ["tweet", "video", "link"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const contentSchema = z.object({
    title: z.string("Title is required.").trim().min(3, "Title must be at least 3 characters."),
    link: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
        error: (link) =>
            link.input === "" || link.input === undefined
                ? "Link is required."
                : "Invalid link.",
    }),
    type: z
        .enum(CONTENT_TYPES, "Type is required.")
        .nullable()
        .refine((v) => v !== null, {
            error: "Type is required.",
        }),
    tags: z
        .array(z.string().trim().toLowerCase(), "Tags are required.")
        .min(1, "At least 1 tag is required.")
        .max(10, "Maximum 10 tags allowed."),
});

export type ContentSchemaType = z.infer<typeof contentSchema>;
export interface ContentInput extends Omit<ContentSchemaType, "type"> {
    type: ContentType | null;
}
export interface Content extends ContentSchemaType {
    id: string;
    createdAt: string;
    updatedAt: string;
}
