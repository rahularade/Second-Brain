import { KeyRound, LogOut, Trash2 } from "lucide-react";
import Button from "./ui/Button";

const DropdownMenu = () => {
    return (
        <div className="absolute top-16.5 right-4 flex flex-col bg-card border rounded-md drop-shadow-sm p-1">
            <Button variant={"ghost"} size={"sm"} className="justify-baseline px-2 py-1.5">
                <KeyRound className="mr-2 h-4 w-4" />
                Change Password
            </Button>
            <Button variant={"ghost"} size={"sm"} className="justify-baseline px-2 py-1.5">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
            <div className="border-t my-1"></div>
            <Button variant={"ghost"} size={"sm"} className="justify-baseline px-2 py-1.5 text-destructive hover:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
            </Button>
        </div>
    );
};

export default DropdownMenu;
