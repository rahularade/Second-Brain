import api from "../lib/axios"

export const createShareLink = async () => {
  const res = await api.post("/brain/share", { share: true });
  return res.data;
};

export const deleteShareLink = async () => {
  const res = await api.post("/brain/share", { share: false });
  return res.data;
};