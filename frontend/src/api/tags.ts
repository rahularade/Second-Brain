import api from "../lib/axios";

export const fetchTags = async () => {
    const res = await api.get("/tags");
    return res.data;
};