import { useState } from "react";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import type { Content, ContentType } from "../schemas/content.schema";
import { cn } from "../lib/utils";
import { Plus, Search } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ContentCard from "../components/ContentCard";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(window.matchMedia("(max-width: 768px)").matches ? false : true);
    const [activeTab, setActiveTab] = useState<ContentType | "all">("all");

    const onClose = () => setIsOpen(false);
    const onTabChange = (tab: ContentType | "all") => {
        setActiveTab(tab);
        if (window.matchMedia("(max-width: 768px)").matches) {
            setIsOpen(false);
        }
    };

    const contents: Content[] = [
        {
            id: "fd330ff6-e692-4e50-b8ae-a8b93c7f0b45",
            title: "How to Build a Second Brain",
            type: "video",
            link: "https://www.youtube.com/watch?v=YOLELVM0TAg",
            createdAt: "2026-01-04T08:44:25.144Z",
            updatedAt: "2026-01-04T08:44:25.144Z",
            tags: ["productivity", "learning"],
        },
        {
            id: "e9598bc5-7e9a-4c10-acb6-87d652cd2dc5",
            title: "Interesting Thread on AI",
            type: "tweet",
            link: "https://twitter.com/example/status/123456789",
            createdAt: "2026-01-04T08:46:24.351Z",
            updatedAt: "2026-01-04T08:46:24.351Z",
            tags: ["ai", "tech"],
        },
        {
            id: "f7413ca4-6989-4df5-bbe6-e562d92c55f5",
            title: "React Documentation",
            type: "link",
            link: "https://react.dev",
            createdAt: "2026-01-04T09:00:05.185Z",
            updatedAt: "2026-01-04T09:00:05.185Z",
            tags: ["react", "documentation", "frontend"],
        },
        {
            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            title: "CSS Grid Tutorial",
            type: "video",
            link: "https://www.youtube.com/watch?v=example",
            createdAt: "2026-01-03T10:30:00.000Z",
            updatedAt: "2026-01-03T10:30:00.000Z",
            tags: ["css", "tutorial", "react", "documentation", "frontend"],
        },
        {
            id: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
            title: "TypeScript Best Practices",
            type: "link",
            link: "https://typescript-best-practices.com",
            createdAt: "2026-01-02T14:20:00.000Z",
            updatedAt: "2026-01-02T14:20:00.000Z",
            tags: ["typescript", "best-practices"],
        },
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar
                activeTab={activeTab}
                onTabChange={onTabChange}
                isOpen={isOpen}
                onClose={onClose}
            />
            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-300",
                    isOpen && "md:ml-72"
                )}
            >
                <Appbar setIsOpen={setIsOpen} />
                <main className="flex-1 p-4 sm:p-6">
                    <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div className="flex flex-col gap-0.5">
                            <h1 className="text-2xl font-bold capitalize">
                                {activeTab === "all"
                                    ? "All Contents"
                                    : `${activeTab}s`}
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                {contents.length}{" "}
                                {contents.length === 1 ? "item" : "items"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="relative w-72">
                                <Search className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
                                <Input
                                    type="search"
                                    placeholder="Search by title..."
                                    className="pl-9"
                                />
                            </div>
                            <Button className="flex-1 sm:flex-none">
                                <Plus className="size-5"/>
                                <p className="hidden sm:block">Add <span >Content</span></p>
                            </Button>
                        </div>
                    </div>
                    <div className={cn("grid gap-4 sm:grid-cols-2 md:grid-cols-3", !isOpen && "sm:grid-cols-3 md:grid-cols-4")}>
                        {contents.map(content => <ContentCard content={content}/>)}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
