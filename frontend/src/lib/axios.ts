import axios, { AxiosError } from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
    throw new Error("VITE_BACKEND_URL is missing");
}

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
        if (!error.response) {
            return Promise.reject(new Error("Unable to connect to the server. Please try again later"));
        }
        const status = error.response?.status;

        if (status === 401) {
            return Promise.reject(
                new Error("Session expired. Please sign in again")
            );
        }

        const message =
            error.response?.data?.message ||
            "Something went wrong. Please try again later";

        return Promise.reject(new Error(message));
    }
);

export default api;
