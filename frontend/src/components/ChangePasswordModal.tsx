import type { Dispatch, SetStateAction } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Label from "./ui/Label";
import { useForm } from "react-hook-form";
import {
    changePasswordSchema,
    type ChangePasswordInput,
} from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "./PasswordField";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/auth";
import { toast } from "sonner";

interface ChangePasswordModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordModal = ({ open, setOpen }: ChangePasswordModalProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            toast.success("Password changed successfully.");
            onClose();
        },
        onError: (error) => {
            toast.error(`${error.message}.`);
        },
    });

    const onClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit = (data: ChangePasswordInput) => {
        mutate(data);
    };

    return (
        <Modal open={open}>
            <div className="grid w-11/12 max-w-md gap-4 p-6 border bg-background shadow-lg rounded-lg duration-200">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h1 className="text-lg font-semibold">Change Password</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="oldPassword"
                                error={errors.oldPassword?.message}
                            >
                                Old Password
                            </Label>
                            <PasswordField
                                id="oldPassword"
                                control={control}
                                name="oldPassword"
                            />
                            {errors.oldPassword && (
                                <p className="text-destructive text-sm">
                                    {errors.oldPassword?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="newPassword"
                                error={errors.newPassword?.message}
                            >
                                New Password
                            </Label>
                            <PasswordField
                                id="newPassword"
                                control={control}
                                name="newPassword"
                            />
                            {errors.newPassword && (
                                <p className="text-destructive text-sm">
                                    {errors.newPassword?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="confirmPassword"
                                error={errors.confirmPassword?.message}
                            >
                                Confirm Password
                            </Label>
                            <PasswordField
                                id="confirmPassword"
                                control={control}
                                name="confirmPassword"
                            />
                            {errors.confirmPassword && (
                                <p className="text-destructive text-sm">
                                    {errors.confirmPassword?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                        <Button
                            type="button"
                            variant={"outline"}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Changing..." : "Change Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ChangePasswordModal;
