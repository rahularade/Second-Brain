import { KeyRound, LogOut, Trash2 } from "lucide-react";
import Button from "./ui/Button";
import { cn } from "../lib/utils";


interface SharePopoverProps{
    open: boolean,
    onClose: () => void
}

const DropdownMenu = ({ open, onClose }: SharePopoverProps) => {
    return (
        <div
            className={cn(
                "absolute right-4 top-13 w-48 rounded-md border bg-background p-1 shadow-md",
                "origin-top-right transition-all duration-200 ease-out",
                open
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-95 opacity-0 -z-10 -translate-y-2 pointer-events-none"
            )}
        >
            <Button
                variant={"ghost"}
                size={"sm"}
                className="justify-baseline px-2 py-1.5 w-full"
            >
                <KeyRound className="mr-2 h-4 w-4" />
                Change Password
            </Button>
            <Button
                variant={"ghost"}
                size={"sm"}
                className="justify-baseline px-2 py-1.5 w-full"
            >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
            <div className="border-t my-1"></div>
            <Button
                variant={"ghost"}
                size={"sm"}
                className="justify-baseline px-2 py-1.5 w-full text-destructive hover:text-destructive"
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
            </Button>
        </div>
    );
};

export default DropdownMenu;
