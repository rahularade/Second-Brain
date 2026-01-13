import type { Dispatch, SetStateAction } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface DeleteAccountModalProps{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteAccountModal = ({open, setOpen}: DeleteAccountModalProps) => {
    return (
        <Modal open={open}>
            <div className="grid w-11/12 max-w-lg gap-4 p-6 border bg-background shadow-lg rounded-lg duration-200">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h1 className="text-lg font-semibold">Delete Account</h1>
                    <p className="text-sm text-muted-foreground">
                        This action cannot be undone. This will permanently delete your account and remove all your data.
                    </p>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                    <Button
                        variant={"outline"}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant={"destructive"}>Delete Account</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteAccountModal;
