import { PanelLeft, User } from "lucide-react";
import Button from "./ui/Button";
import ThemeToggler from "./ThemeToggler";
import DropdownMenu from "./DropdownMenu";
import { useEffect, useRef, useState } from "react";

interface AppbarProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Appbar = ({setIsOpen}: AppbarProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-2 sm:px-4">
            <Button variant={"ghost"} size={"icon"} onClick={() => setIsOpen(prev => !prev)}>
                <PanelLeft className="size-4" />
            </Button>
            <div ref={ref} className="flex items-center gap-0.5 sm:gap-4">
                <ThemeToggler />
                <Button
                    variant={"ghost"}
                    className="flex items-center gap-2"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">John Doe</span>
                </Button>
                {open && <DropdownMenu />}
            </div>
        </header>
    );
};

export default Appbar;
