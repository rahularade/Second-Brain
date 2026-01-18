import { Brain, LayoutGrid, Link2, Twitter, Video, X } from "lucide-react";
import { cn } from "../lib/utils";
import Button from "./ui/Button";
import type { ContentType } from "../schemas/content.schema";
import { Link } from "react-router-dom";

interface SidebarProps {
    activeTab: ContentType | "all";
    onTabChange: (tab: ContentType | "all") => void;
    isOpen: boolean;
    onClose: () => void;
}

const filters = [
    { value: "all" as const, label: "All Contents", icon: LayoutGrid },
    { value: "video" as const, label: "Videos", icon: Video },
    { value: "tweet" as const, label: "Tweets", icon: Twitter },
    { value: "link" as const, label: "Links", icon: Link2 },
];

const Sidebar = ({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) => {
    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-primary/40 md:hidden"
                />
            )}
            <aside
                // ref={ref}
                className={cn(
                    "fixed left-0 top-0 h-screen w-72 z-50 border-r bg-sidebar-background transition-transform duration-300",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between px-4 border-b h-14">
                    <Link to={"/"} className="flex items-center gap-2">
                        <Brain className="size-6 text-primary" />
                        <span className="font-semibold">Second Brain</span>
                    </Link>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="size-8 md:hidden"
                        onClick={onClose}
                    >
                        <X className="size-5" />
                    </Button>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                    {filters.map((filter) => (
                        <Button
                            key={filter.value}
                            variant={
                                activeTab === filter.value ? "primary" : "ghost"
                            }
                            className={"w-full justify-start gap-3"}
                            onClick={() => onTabChange(filter.value)}
                        >
                            <filter.icon className="size-4" />
                            {filter.label}
                        </Button>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
