import { cn } from "../../lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    error?: string;
}

const Label = ({ className, error, ...props }: LabelProps) => {
    return (
        <label
            className={cn("text-sm font-medium leading-none", className, error && "text-destructive")}
            {...props}
        />
    );
};

export default Label;
