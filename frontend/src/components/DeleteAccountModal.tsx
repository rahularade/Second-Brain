import type { Dispatch, SetStateAction } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount } from "../api/auth";
import { toast } from "sonner";

interface DeleteAccountModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteAccountModal = ({ open, setOpen }: DeleteAccountModalProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            queryClient.clear();
            toast.success("Account deleted successfully.");
            navigate("/", { replace: true });
        },
        onError: (error) => {
            toast.error(`${error.message}.`);
        },
    });
    return (
        <Modal open={open}>
            <div className="grid w-11/12 max-w-lg gap-4 p-6 border bg-background shadow-lg rounded-lg duration-200">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h1 className="text-lg font-semibold">Delete Account</h1>
                    <p className="text-sm text-muted-foreground">
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data.
                    </p>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                    <Button variant={"outline"} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={() => mutate()}
                        disabled={isPending}
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteAccountModal;
