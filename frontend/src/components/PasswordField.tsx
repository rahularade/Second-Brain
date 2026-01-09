import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { useController, type UseControllerProps } from "react-hook-form";

type PasswordFieldProps = UseControllerProps<any> & {
    id: string
}

const PasswordField = ({id, ...props}: PasswordFieldProps) => {
    const {field, fieldState} = useController(props)
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                id={id}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...field}
                error={fieldState.error?.message}
            />
            <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                className="absolute right-0 top-0 px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                )}
            </Button>
        </div>
    );
};

export default PasswordField;
