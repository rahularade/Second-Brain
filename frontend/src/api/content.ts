import api from "../lib/axios";
import type { ContentInput } from "../schemas/content.schema";

export type ContentMutationInput = {
    contentId?: string;
    data: ContentInput;
};

export const fetchContents = async (
    signal: AbortSignal,
    type: string,
    search: string
) => {
    const res = await api.get("/content", {
        signal,
        params: { type, search },
    });
    return res.data;
};

export const addContent = async ({ data }: ContentMutationInput) => {
    const res = await api.post("/content", data);
    return res.data;
};

export const updateContent = async ({
    contentId,
    data,
}: ContentMutationInput) => {
    const res = await api.put(`/content/${contentId}`, data);
    return res.data;
};
