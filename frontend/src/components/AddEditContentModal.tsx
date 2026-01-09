import { useForm } from "react-hook-form";
import {
    contentSchema,
    type Content,
    type ContentInput,
} from "../schemas/content.schema";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "./ui/Label";
import Input from "./ui/Input";
import { useEffect } from "react";
import TypeField from "./TypeField";
import TagsField from "./TagsField";

interface AddEditContentModalProps {
    open: boolean;
    setIsModalOpen: (open: boolean) => void;
    content: Content | null;
}

const AddEditContentModal = ({
    open,
    setIsModalOpen,
    content,
}: AddEditContentModalProps) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContentInput>({
        resolver: zodResolver(contentSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            link: "",
            type: null,
            tags: [],
        },
    });

    useEffect(() => {
        if (content) {
            reset({
                title: content.title,
                link: content.link,
                type: content.type,
                tags: content.tags,
            });
        } else {
            reset({
                title: "",
                link: "",
                type: null,
                tags: [],
            });
        }
    }, [content, open, reset]);

    const onClose = () => {
        setIsModalOpen(false);
        reset();
    };

    const onSubmit = async (data: ContentInput) => {
        await new Promise(res => setTimeout(res, 2000))
        console.log(data);
    };

    return (
        <Modal open={open}>
            <div className="grid w-11/12 max-w-md gap-4 p-6 border bg-background shadow-lg rounded-lg duration-200">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h1 className="text-lg font-semibold">
                        {content ? "Edit Content" : "Add New Content"}
                    </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="title"
                                error={errors.title?.message}
                            >
                                Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter a title"
                                {...register("title")}
                                error={errors.title?.message}
                            />
                            {errors.title && (
                                <p className="text-destructive text-sm">
                                    {errors.title?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="link" error={errors.link?.message}>
                                Link
                            </Label>
                            <Input
                                id="link"
                                type="text"
                                placeholder="https://example.com"
                                {...register("link")}
                                error={errors.link?.message}
                            />
                            {errors.link && (
                                <p className="text-destructive text-sm">
                                    {errors.link?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="type" error={errors.type?.message}>
                                Type
                            </Label>
                            <TypeField control={control} name="type"/>
                            {errors.type && (
                                <p className="text-destructive text-sm">
                                    {errors.type?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="tags" error={errors.tags?.message}>
                                Tags
                            </Label>
                            <TagsField
                                control={control}
                                name="tags"
                            />
                            {errors.tags && (
                                <p className="text-destructive text-sm">
                                    {errors.tags?.message}
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
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? "Saving..."
                                : content
                                ? "Update"
                                : "Add"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddEditContentModal;
