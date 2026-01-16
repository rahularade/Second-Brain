import { Link, Link2, Pencil, Trash2, Twitter, Video } from "lucide-react";
import Button from "./ui/Button";
import tweet from "../assets/tweet.png";
import video from "../assets/video.png";
import { formatDistanceToNow } from "date-fns";
import type { Content } from "../schemas/content.schema";
import { useState } from "react";
import Modal from "./ui/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContent } from "../api/content";
import { toast } from "sonner";

interface ContentCardProps {
    content: Content;
    handleEdit: (content: Content) => void;
}

const typeIcons = {
    video: Video,
    tweet: Twitter,
    link: Link2,
};

const typeColors = {
    video: "bg-destructive/10 text-destructive",
    tweet: "bg-muted text-muted-foreground",
    link: "bg-primary/10 text-primary",
};

const ContentCard = ({ content, handleEdit }: ContentCardProps) => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: deleteContent,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["contents"]})
            toast.success("Content deleted successfully.")
            setIsModalOpen(false)
        },
        onError: (error) => {
            toast.error(`${error.message}.`)
        }
    })
    const Icon = typeIcons[content.type];
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="flex flex-col gap-2 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div
                        className={`p-1.5 rounded-md ${
                            typeColors[content.type]
                        }`}
                    >
                        <Icon className="size-3.5" />
                    </div>
                    <span className="min-w-0 flex-1 text-xs capitalize">
                        {content.type}
                    </span>
                </div>
                <div className="flex gap-1">
                    <Button variant={"ghost"} size={"icon"} className="h-7 w-7" onClick={() => handleEdit(content)}>
                        <Pencil className="size-3.5" />
                    </Button>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="h-7 w-7 text-destructive"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Trash2 className="size-3.5" />
                    </Button>
                    <Modal open={isModalOpen}>
                        <div className="grid w-11/12 max-w-lg gap-4 p-6 border bg-background shadow-lg rounded-lg duration-200">
                            <div className="flex flex-col gap-2 text-center sm:text-left">
                                <h1 className="text-lg font-semibold">Delete Content</h1>
                                <p className="text-sm text-muted-foreground">Are you sure you want to delete "<span className="font-semibold">{content.title}</span>"? This action cannot be undone.</p>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                                <Button variant={"outline"} onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button variant={"destructive"} onClick={() => mutate(content.id)}>Delete</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <h3 className="font-medium text-sm leading-tight line-clamp-2">
                    {content.title}
                </h3>
                <a
                    href={content.link}
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                    {content.type === "link" ? (
                        <Link className="size-3.5 text-primary" />
                    ) : (
                        <img
                            alt={content.type}
                            src={content.type === "tweet" ? tweet : video}
                            className="size-3.5"
                        />
                    )}
                    <p className="line-clamp-1 wrap-break-word">
                        {new URL(content.link).hostname}
                    </p>
                </a>
                <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(content.createdAt), {
                    addSuffix: true,
                })}
            </p>
            </div>
                {content.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {content.tags.map((tag) => (
                            <span key={tag} className="bg-secondary py-0.5 px-2.5 text-xs rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default ContentCard;
