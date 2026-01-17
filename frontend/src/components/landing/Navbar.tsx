import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import ThemeToggler from "../ThemeToggler";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user } = useAuth();
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between mx-auto">
                <div className="flex items-center gap-2">
                    <Brain className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold">Second Brain</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggler />
                    {!user && (
                        <Link to={"/signin"}>
                            <Button variant={"ghost"}>Sign In</Button>
                        </Link>
                    )}
                    <Link to={"/dashboard"}>
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
