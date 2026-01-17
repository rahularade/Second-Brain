import { useState } from "react";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import type { Content, ContentType } from "../schemas/content.schema";
import { cn } from "../lib/utils";
import { Plus, Search } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ContentCard from "../components/ContentCard";
import AddEditContentModal from "../components/AddEditContentModal";
import DeleteAccountModal from "../components/DeleteAccountModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useQuery } from "@tanstack/react-query";
import { fetchContents } from "../api/content";
import Loader from "../components/Loader";
import EmptyContent from "../components/EmptyContent";
import useDebounce from "../hooks/useDebounce";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(
        window.matchMedia("(max-width: 768px)").matches ? false : true
    );
    const [activeTab, setActiveTab] = useState<ContentType | "all">("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContent, setEditingContent] = useState<Content | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
        useState(false);
    const [search, setSearch] =
        useState("");
    const debouncedValue = useDebounce(search, 300)

    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ["contents", activeTab, debouncedValue],
        queryFn: ({signal}) => fetchContents(signal, activeTab, debouncedValue),
        select: (data) => data.contents,
        staleTime: Infinity
    });

    const onClose = () => setIsOpen(false);
    const onTabChange = (tab: ContentType | "all") => {
        setActiveTab(tab);
        if (window.matchMedia("(max-width: 768px)").matches) {
            setIsOpen(false);
        }
    };

    const handleAddNew = () => {
        setEditingContent(null);
        setIsModalOpen(true);
    };

    const handleEdit = (content: Content) => {
        setEditingContent(content);
        setIsModalOpen(true);
    };

    const contents: Content[] = data ?? []

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
                <Appbar
                    setIsOpen={setIsOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setIsChangePasswordModalOpen={setIsChangePasswordModalOpen}
                />
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
                            <Button
                                className="flex-1 sm:flex-none"
                                onClick={handleAddNew}
                            >
                                <Plus className="size-5" />
                                <p className="hidden sm:block">Add Content</p>
                            </Button>
                        </div>
                    </div>
                    <div
                        className={
                            isPending || isError || contents.length === 0
                                ? "min-h-96 flex items-center justify-center"
                                : cn(
                                      "grid gap-4 sm:grid-cols-2 md:grid-cols-3",
                                      !isOpen && "sm:grid-cols-3 md:grid-cols-4"
                                  )
                        }
                    >
                        {isPending ? (
                            <Loader />
                        ) : isError ? (
                            <div className="flex flex-col items-center gap-3 text-center">
                                <p className="text-destructive text-sm">
                                    {error.message ? `${error.message}.` :
                                        "Failed to load contents."}
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
                            <EmptyContent onAddClick={handleAddNew} />
                        ) : (
                            contents.map((content) => (
                                <ContentCard
                                    key={content.id}
                                    content={content}
                                    handleEdit={handleEdit}
                                />
                            ))
                        )}
                    </div>
                    <AddEditContentModal
                        open={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        content={editingContent}
                    />
                    <DeleteAccountModal
                        open={isDeleteModalOpen}
                        setOpen={setIsDeleteModalOpen}
                    />
                    <ChangePasswordModal
                        open={isChangePasswordModalOpen}
                        setOpen={setIsChangePasswordModalOpen}
                    />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
