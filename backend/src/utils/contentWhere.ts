import { ContentType } from "../generated/prisma/enums.js";

export function parseContentQuery(userId:string, query: any) {
    const search = typeof query.search === "string" ? query.search.trim() : "";

    const type =
        typeof query.type === "string" &&
        ["ALL", ...Object.values(ContentType)].includes(
            query.type.toUpperCase()
        )
            ? query.type.toUpperCase()
            : "ALL";

    const where: any = {
        userId,
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

    return { where };
}
