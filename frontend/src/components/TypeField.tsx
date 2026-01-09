import { useController, type UseControllerProps } from "react-hook-form";
import type { ClassNamesConfig } from "react-select";
import { cn } from "../lib/utils";
import Select from "react-select";
import { ChevronDown } from "lucide-react";
import type { ContentInput } from "../schemas/content.schema";

const options = [
    { value: "tweet", label: "Tweet" },
    { value: "video", label: "Video" },
    { value: "link", label: "Link" },
];

type TypeFieldProps = UseControllerProps<ContentInput, "type">


const TypeField = (props: TypeFieldProps) => {
    const { field, fieldState } = useController(props);

    const SelectStyles: ClassNamesConfig = {
        control: ({ isFocused, isDisabled,  }) =>
            cn(
                "min-h-10 w-full px-3 py-2 rounded-md border bg-background text-sm",
                "border-input",
                "outline-none",
                !isDisabled && isFocused && "ring-2 ring-ring/50",
                isDisabled && "cursor-not-allowed opacity-50",
                fieldState.error?.message && "border-destructive ring-destructive/50"
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

    return (
        <Select
            inputId="type"
            value={
                field?.value && {
                    label: field.value,
                    value: field.value,
                }
            }
            onChange={(option: any) => field.onChange(option.value)}
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
    );
};

export default TypeField;
