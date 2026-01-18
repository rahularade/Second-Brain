import { LayoutDashboard, LogIn, PanelLeft } from "lucide-react";
import Button from "./ui/Button";
import ThemeToggler from "./ThemeToggler";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
interface PublicAppbarProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicAppbar = ({ setIsOpen }: PublicAppbarProps) => {
    const { user } = useAuth();
    return (
        <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-2 sm:px-4">
            <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <PanelLeft className="size-4" />
            </Button>
            <div className="flex items-center gap-0.5 sm:gap-4">
                <ThemeToggler />
                {user ? (
                    <Link to="/dashboard">
                        <Button variant={"ghost"}>
                            <LayoutDashboard className="size-4 mr-1" />
                            Dashboard
                        </Button>
                    </Link>
                ) : (
                    <Link to="/signin">
                        <Button variant="outline" size="sm">
                            <LogIn className="size-4 mr-1" />
                            Sign in
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default PublicAppbar;
