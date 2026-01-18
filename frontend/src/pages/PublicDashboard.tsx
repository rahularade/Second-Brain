import { useState } from "react";
import Sidebar from "../components/Sidebar";
import type { Content, ContentType } from "../schemas/content.schema";
import { cn } from "../lib/utils";
import { FolderOpen, Search } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchBrainContents } from "../api/content";
import Loader from "../components/Loader";
import useDebounce from "../hooks/useDebounce";
import PublicAppbar from "../components/PublicAppbar";
import PublicContentCard from "../components/PublicContentCard";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicDashboard = () => {
    const {isLoading} = useAuth();
    const [isOpen, setIsOpen] = useState(
        window.matchMedia("(max-width: 768px)").matches ? false : true,
    );
    const [activeTab, setActiveTab] = useState<ContentType | "all">("all");
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 300);
    const {shareLink} = useParams()

    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ["contents", activeTab, debouncedValue],
        queryFn: ({ signal }) =>
            fetchBrainContents(signal, activeTab, debouncedValue,shareLink!),
        select: (data) => data.contents,
        staleTime: Infinity,
    });

    const onClose = () => setIsOpen(false);
    const onTabChange = (tab: ContentType | "all") => {
        setActiveTab(tab);
        if (window.matchMedia("(max-width: 768px)").matches) {
            setIsOpen(false);
        }
    };

    if (isLoading) return <div className="h-screen w-full flex items-center justify-center">
        <Loader />
    </div>;
    const contents: Content[] = data ?? [];
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
                    isOpen && "md:ml-72",
                )}
            >
                <PublicAppbar setIsOpen={setIsOpen} />
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
                                <Search className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search by title..."
                                    className="pl-9"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            isPending || isError || contents.length === 0
                                ? "min-h-96 flex items-center justify-center"
                                : cn(
                                      "grid gap-4 sm:grid-cols-2 md:grid-cols-3",
                                      !isOpen &&
                                          "sm:grid-cols-3 md:grid-cols-4",
                                  )
                        }
                    >
                        {isPending ? (
                            <Loader />
                        ) : isError ? (
                            <div className="flex flex-col items-center gap-3 text-center">
                                <p className="text-destructive text-sm">
                                    {error.message
                                        ? `${error.message}.`
                                        : "Failed to load contents."}
                                </p>

                                <Button
                                    variant="outline"
                                    onClick={() => refetch()}
                                    disabled={isPending}
                                >
                                    Retry
                                </Button>
                            </div>
                        ) : contents.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">
                                    No contents yet!
                                </h3>
                            </div>
                        ) : (
                            contents.map((content) => (
                                <PublicContentCard
                                    key={content.id}
                                    content={content}
                                />
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PublicDashboard;
