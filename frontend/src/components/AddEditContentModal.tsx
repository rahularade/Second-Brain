import { Controller, useForm } from "react-hook-form";
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
import { cn } from "../lib/utils";
import Select, { type ClassNamesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import { ChevronDown, X } from "lucide-react";

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

    const onSubmit = (data: ContentInput) => {
        console.log(data);
    };

    const options = [
        { value: "tweet", label: "Tweet" },
        { value: "video", label: "Video" },
        { value: "link", label: "Link" },
    ];

    const SelectStyles: ClassNamesConfig = {
        control: ({ isFocused, isDisabled }) =>
            cn(
                "min-h-10 w-full px-3 py-2 rounded-md border bg-background text-sm",
                "border-input",
                "outline-none",
                !isDisabled && isFocused && "ring-2 ring-ring/50",
                isDisabled && "cursor-not-allowed opacity-50",
                errors.type?.message && "border-destructive ring-destructive/50"
            ),
        input: () => "h-5.5 text-sm text-foreground",
        singleValue: () => "capitalize",
        placeholder: () => "text-muted-foreground",
        menuList: () => "rounded-md border bg-popover shadow-md max-h-40!",
        option: ({ isFocused, isSelected }) =>
            cn(
                "cursor-pointer px-3 py-2 text-sm! capitalize",
                isSelected && "bg-primary text-primary-foreground",
                !isSelected && isFocused && "bg-accent"
            ),
        noOptionsMessage: () => "py-2 text-sm",
        dropdownIndicator: () =>
            "px-1 hover:cursor-pointer text-muted-foreground first:stroke-1",
    };

    const CreatableStyles: ClassNamesConfig = {
        control: ({ isFocused, isDisabled }) =>
            cn(
                "min-h-10 w-full px-3 py-2 rounded-md border bg-background text-sm",
                "border-input",
                "outline-none",
                !isDisabled && isFocused && "ring-2 ring-ring/50",
                isDisabled && "cursor-not-allowed opacity-50",
                errors.tags?.message && "border-destructive ring-destructive/50"
            ),
        valueContainer: () => "gap-2",
        input: () => "h-5.5 text-sm text-foreground",
        placeholder: () => "text-muted-foreground",
        multiValue: () =>
            "bg-secondary text-secondary-foreground rounded-full px-2 py-px",
        multiValueLabel: () => "text-sm",
        multiValueRemove: () => "cursor-pointer",
        menuList: () => "rounded-md border bg-popover shadow-md max-h-40!",
        option: ({ isFocused, isSelected }) =>
            cn(
                "cursor-pointer px-3 py-2 text-sm!",
                isSelected && "bg-primary text-primary-foreground",
                !isSelected && isFocused && "bg-accent"
            ),
        noOptionsMessage: () => "py-2 text-sm",
        loadingMessage: () => "py-2 text-sm",
        clearIndicator: () => "px-1 hover:cursor-pointer text-muted-foreground",
        dropdownIndicator: () =>
            "px-1 hover:cursor-pointer text-muted-foreground first:stroke-1",
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
                            <Label error={errors.type?.message}>
                                Type
                            </Label>
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <Select
                                        value={
                                            field?.value && {
                                                label: field.value,
                                                value: field.value,
                                            }
                                        }
                                        onChange={(option: any) =>
                                            field.onChange(option.value)
                                        }
                                        unstyled
                                        options={options}
                                        classNames={SelectStyles}
                                        components={{
                                            DropdownIndicator: (props) => (
                                                <div
                                                    {...props.innerProps}
                                                    className="cursor-pointer text-foreground"
                                                >
                                                    <ChevronDown className="size-5" />
                                                </div>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            {errors.type && (
                                <p className="text-destructive text-sm">
                                    {errors.type?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label error={errors.tags?.message}>
                                Tags
                            </Label>
                            <Controller
                                control={control}
                                name="tags"
                                render={({ field }) => (
                                    <CreatableSelect
                                        isMulti
                                        unstyled
                                        value={field.value?.map((v) => ({
                                            label: v,
                                            value: v,
                                        }))}
                                        options={options}
                                        onChange={(options) => {
                                            field.onChange(
                                                options.map(
                                                    (tag: any) => tag.value
                                                )
                                            );
                                        }}
                                        onCreateOption={(inputValue) => {
                                            const tag = inputValue
                                                .trim()
                                                .toLowerCase();
                                            if (field.value?.includes(tag))
                                                return;
                                            field.onChange([
                                                ...field.value,
                                                tag,
                                            ]);
                                        }}
                                        isValidNewOption={(inputValue) =>
                                            inputValue.trim().length > 1
                                        }
                                        classNames={CreatableStyles}
                                        components={{
                                            DropdownIndicator: (props) => (
                                                <div
                                                    {...props.innerProps}
                                                    className="cursor-pointer text-foreground"
                                                >
                                                    <ChevronDown className="size-5" />
                                                </div>
                                            ),
                                            ClearIndicator: (props) => (
                                                <div
                                                    {...props.innerProps}
                                                    className="px-2 cursor-pointer hover:text-destructive"
                                                >
                                                    <X className="size-5" />
                                                </div>
                                            ),
                                            MultiValueRemove: (props) => (
                                                <div
                                                    {...props.innerProps}
                                                    className="cursor-pointer py-0.5 pl-0.5 hover:text-destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </div>
                                            ),
                                        }}
                                    />
                                )}
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
