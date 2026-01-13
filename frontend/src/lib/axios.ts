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
        const currentPath = window.location.pathname;

        if (status === 401) {
            const isAuthPage =
                currentPath.startsWith("/signin") ||
                currentPath.startsWith("/signup");

            if (!isAuthPage) {
                window.location.href = "/signin";
            }
        }

        const message =
            error.response?.data?.message ||
            "Something went wrong";

        return Promise.reject(new Error(message));
    }
);

export default api;
