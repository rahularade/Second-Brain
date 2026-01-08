import z from "zod";

export const CONTENT_TYPES = ["tweet", "video", "link"] as const;
export type ContentType =  typeof CONTENT_TYPES[number];

export const contentSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    link: z.url("Invalid link"),
    type: z.enum(CONTENT_TYPES, "Type is required").nullable().refine((v) => v !== null, {
      message: "Type is required",
    }),
    tags: z
        .array(
            z
                .string()
                .trim()
                .toLowerCase(),
            "Invalid tag name"
        )
        .min(1, "At least 1 tag is required")
        .max(10, "Maximum 10 tags allowed"),
});

export type ContentSchemaType = z.infer<typeof contentSchema>
export interface ContentInput extends Omit<ContentSchemaType, "type">{
    type: ContentType | null
}
export interface Content extends ContentSchemaType{
    id: string,
    createdAt: string,
    updatedAt: string
}