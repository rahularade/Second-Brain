import { Brain, Github, Linkedin, Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import ThemeToggler from "../ThemeToggler";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { cn } from "../../lib/utils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    const onClose = () => setIsOpen(false);
    return (
        <>
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="w-11/12 sm:container flex h-16 items-center justify-between mx-auto">
                    <div className="flex items-center gap-2">
                        <Brain className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">Second Brain</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                        <a
                            href="https://rahularade.site"
                            target="_blank"
                        >
                            <Button variant={"ghost"} size={"icon"}>
                                <User className="size-4" />
                            </Button>
                        </a>
                        <a
                            href="https://github.com/rahularade/Second-Brain"
                            target="_blank"
                        >
                            <Button variant={"ghost"} size={"icon"}>
                                <Github className="size-4" />
                            </Button>
                        </a>
                        <a
                            href="https://in.linkedin.com/in/rahul-arade"
                            target="_blank"
                        >
                            <Button variant={"ghost"} size={"icon"}>
                                <Linkedin className="size-4" />
                            </Button>
                        </a>
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
                    <div className="flex sm:hidden items-center gap-4">
                        <ThemeToggler />
                        <Button
                            variant={"ghost"}
                            onClick={() => setIsOpen(true)}
                            className="p-0"
                        >
                            <Menu className="size-5 rotate-0 scale-100 transition-all" />
                        </Button>
                    </div>
                </div>
            </header>
            {isOpen && (
                <>
                    <div
                        onClick={onClose}
                        className="fixed inset-0 z-51 bg-primary/40 md:hidden"
                    />
                </>
            )}
            <div
                aria-hidden={isOpen}
                className={cn(
                    "fixed right-0 top-0 h-screen w-72 z-55 border-r bg-sidebar-background transition-transform duration-300",
                    isOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                <div className="flex items-center justify-between px-4 border-b h-16">
                    <Link to={"/"} className="flex items-center gap-2">
                        <Brain className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">Second Brain</span>
                    </Link>
                    <Button variant={"ghost"} className="p-0" onClick={onClose}>
                        <X className="size-5" />
                    </Button>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                    {!user && (
                        <>
                            <Link to={"/signin"}>
                                <Button variant={"ghost"} className="w-full">
                                    Sign In
                                </Button>
                            </Link>
                            <Link to={"/signup"}>
                                <Button variant={"ghost"} className="w-full">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                    <Link to={"/dashboard"}>
                        <Button className="w-full">Get Started</Button>
                    </Link>
                    <div className="flex items-end justify-center gap-4">
                        <a
                            href="https://rahularade.site"
                            target="_blank"
                        >
                            <Button variant={"ghost"} size={"icon"}>
                                <User className="size-4" />
                            </Button>
                        </a>    
                        <a
                            href="https://github.com/rahularade/Second-Brain"
                            target="_blank"
                        >
                            <Button variant={"ghost"} size={"icon"}>
                                <Github className="size-4" />
                            </Button>
                        </a>
                        <a
                            href="https://in.linkedin.com/in/rahul-arade"
                            target="_blank"
                        >
                            <Button variant={"ghost"} size={"icon"}>
                                <Linkedin className="size-4" />
                            </Button>
                        </a>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
