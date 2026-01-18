import { Link, Link2, Twitter, Video } from "lucide-react";
import tweet from "../assets/tweet.png";
import video from "../assets/video.png";
import { formatDistanceToNow } from "date-fns";
import type { Content } from "../schemas/content.schema";

interface PublicContentCardProps {
    content: Content;
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

const PublicContentCard = ({ content }: PublicContentCardProps) => {
    const Icon = typeIcons[content.type];
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

export default PublicContentCard;
