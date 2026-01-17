import { KeyRound, LogOut, Trash2, User } from "lucide-react";
import Button from "./ui/Button";
import { cn } from "../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout } from "../api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SharePopoverProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    onChangePassword: () => void;
}

const DropdownMenu = ({
    open,
    onClose,
    onDelete,
    onChangePassword,
}: SharePopoverProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { mutate, isPending } = useMutation({
        mutationFn: signout,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]})
            queryClient.clear();
            toast.success("Signed out successfully.");
            navigate("/signin", {replace: true})
        },
        onError: (error) => {
            toast.error(`${error.message}.`);
        },
    });
    const handleDelete = () => {
        onDelete();
        onClose();
    };

    const handleChangePassword = () => {
        onChangePassword();
        onClose();
    };

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
            <div className="visible sm:hidden flex justify-baseline items-center gap-2 px-2 py-1.5 w-full border-b mb-1">
                <User className="mr-2 h-4 w-4" />
                {user?.name}
            </div>
            <Button
                variant={"ghost"}
                size={"sm"}
                className="justify-baseline px-2 py-1.5 w-full"
                onClick={handleChangePassword}
            >
                <KeyRound className="mr-2 h-4 w-4" />
                Change Password
            </Button>
            <Button
                variant={"ghost"}
                size={"sm"}
                className="justify-baseline px-2 py-1.5 w-full"
                onClick={() => mutate()}
                disabled={isPending}
            >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
            <div className="border-t my-1"></div>
            <Button
                variant={"ghost"}
                size={"sm"}
                className="justify-baseline px-2 py-1.5 w-full text-destructive hover:text-destructive"
                onClick={handleDelete}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
            </Button>
        </div>
    );
};

export default DropdownMenu;
