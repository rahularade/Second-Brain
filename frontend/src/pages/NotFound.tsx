import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { Brain } from "lucide-react";
import ThemeToggler from "../components/ThemeToggler";

const NotFound = () => {
    const {user} = useAuth();
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="container flex h-16 items-center justify-between mx-auto">
                    <div className="flex items-center gap-2">
                        <Brain className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">Second Brain</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggler />
                        {user ? (
                            <Link to="/dashboard">
                                <Button>Dashboard</Button>
                            </Link>
                        ) : (
                            <Link to="/signin">
                                <Button>Sign In</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                    <h1 className="mb-4 text-9xl font-bold text-primary/80">
                        404
                    </h1>
                    <p className="mb-6 text-2xl text-muted-foreground">
                        Oops! Page not found
                    </p>
                    <Button>
                        <Link to="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
