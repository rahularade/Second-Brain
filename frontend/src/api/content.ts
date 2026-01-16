import api from "../lib/axios";

export const fetchContents = async (signal: AbortSignal, type: string, search: string) => {
    const res = await api.get("/content", {
        signal,
        params: {type, search}
    })
    return res.data
}