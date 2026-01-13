import { PanelLeft, Share2, User } from "lucide-react";
import Button from "./ui/Button";
import ThemeToggler from "./ThemeToggler";
import DropdownMenu from "./DropdownMenu";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import SharePopover from "./SharePopover";

interface AppbarProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Appbar = ({ setIsOpen, setIsDeleteModalOpen }: AppbarProps) => {
    const [activePopover, setActivePopover] = useState<
        "profile" | "share" | null
    >(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setActivePopover(null);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const onClose = () => setActivePopover(null)

    return (
        <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-2 sm:px-4">
            <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <PanelLeft className="size-4" />
            </Button>
            <div ref={ref} className="flex items-center gap-0.5 sm:gap-4">
                <ThemeToggler />
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    className={cn(
                        "flex items-center gap-2",
                        activePopover === "share" &&
                            "hover:bg-transparent cursor-default"
                    )}
                    onClick={() =>
                        setActivePopover((prev) =>
                            prev === "share" ? null : "share"
                        )
                    }
                >
                    <Share2 className="size-4" />
                </Button>
                <Button
                    variant={"ghost"}
                    className={cn(
                        "flex items-center gap-2",
                        activePopover === "profile" &&
                            "hover:bg-transparent cursor-default"
                    )}
                    onClick={() =>
                        setActivePopover((prev) =>
                            prev === "profile" ? null : "profile"
                        )
                    }
                >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">John Doe</span>
                </Button>
                <DropdownMenu open={activePopover === "profile"} onClose={onClose} onDelete={() => setIsDeleteModalOpen(true)}/>
                <SharePopover open={activePopover === "share"} onClose={onClose}/>
            </div>
        </header>
    );
};

export default Appbar;
