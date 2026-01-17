import { useController, type UseControllerProps } from "react-hook-form";
import type { ContentInput } from "../schemas/content.schema";
import CreatableSelect from "react-select/creatable";
import { ChevronDown, X } from "lucide-react";
import type { ClassNamesConfig } from "react-select";
import { cn } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../api/tags";

type TagsFieldProps = UseControllerProps<ContentInput, "tags">;

const TagsField = (props: TagsFieldProps) => {
    const { field, fieldState } = useController(props);

    const {data, isPending} = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
        select: data => data.tags,
        staleTime: Infinity
    })

    const CreatableStyles: ClassNamesConfig = {
        control: ({ isFocused, isDisabled }) =>
            cn(
                "min-h-10 w-full px-3 py-2 rounded-md border bg-background text-sm",
                "border-input",
                "outline-none",
                !isDisabled && isFocused && "ring-2 ring-ring/50",
                isDisabled && "cursor-not-allowed opacity-50",
                fieldState.error?.message &&
                    "border-destructive ring-destructive/50"
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
        <CreatableSelect
            inputId="tags"
            isMulti
            unstyled
            value={field.value?.map((v) => ({
                label: v,
                value: v,
            }))}
            isLoading={isPending}
            options={data?.map((tag:any) => ({
                label: tag.title,
                value: tag.title,
            }))}
            onChange={(options) => {
                field.onChange(options.map((tag: any) => tag.value));
            }}
            onCreateOption={(inputValue) => {
                const tag = inputValue.trim().toLowerCase();
                if (field.value?.includes(tag)) return;
                field.onChange([...field.value, tag]);
            }}
            isValidNewOption={(inputValue) => inputValue.trim().length > 1}
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
    );
};

export default TagsField;
