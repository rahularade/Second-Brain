import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export function PublicRoute({children} : {children: ReactNode}) {
    const {isLoading, user} = useAuth();
    if (isLoading) return <div className="h-screen w-full flex items-center justify-center">
        <Loader />
    </div>;
    return !user ? children : <Navigate to={"/dashboard"} replace/>
}