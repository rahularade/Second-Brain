import { Content, Tag } from "../generated/prisma/client.js";

export function mapContent(content: Omit<Content, "userId"> & {tags: Pick<Tag, "title">[]}){
    return {
        ...content,
        type: content.type.toLowerCase(),
        tags: content.tags.map((t) => t.title),
    }
}