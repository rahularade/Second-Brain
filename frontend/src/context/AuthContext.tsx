import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UserSignupInput } from "../schemas/user.schema";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/auth";

interface AuthContextType {
    isLoading: boolean;
    user: UserSignupInput | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserSignupInput | null>(null);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        select: (data) => data.user,
    });

    useEffect(() => {
      setUser(isError ? null : data ?? null)
    }, [data, isError]);

    return (
        <AuthContext.Provider value={{ isLoading, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
