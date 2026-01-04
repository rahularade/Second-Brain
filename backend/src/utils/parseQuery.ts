import { ContentType } from "../generated/prisma/enums.js";

export function parseContentQuery(query: any) {
    const search = typeof query.search === "string" ? query.search.trim() : "";

    const type =
        typeof query.type === "string" &&
        ["ALL", ...Object.values(ContentType)].includes(
            query.type.toUpperCase()
        )
            ? query.type.toUpperCase()
            : "ALL";

    const page =
        typeof query.page === "string" && Number.isInteger(Number(query.page))
            ? Math.max(parseInt(query.page, 10), 1)
            : 1;

    const limit =
        typeof query.limit === "string" && Number.isInteger(Number(query.limit))
            ? Math.min(Math.max(parseInt(query.limit, 10), 1), 50)
            : 20;

    const skip = (page - 1) * limit;

    return { search, type, page, limit, skip };
}
