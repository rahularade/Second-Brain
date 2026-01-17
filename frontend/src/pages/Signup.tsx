import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import { useForm } from "react-hook-form";
import { userSignupSchema, type UserSignupInput } from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "../components/PasswordField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../api/auth";
import { toast } from "sonner";

const Signup = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSignupInput>({
        resolver: zodResolver(userSignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: signup,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]})
            toast.success("Account created successfully.")
        },
        onError: (error) => {
            toast.error(`${error.message}.`)
        }
    });

    const onSubmit = (data: UserSignupInput) => {
        mutate(data);
    };

    return (
        <div className="min-h-screen bg-background flex justify-center items-center p-4">
            <div className="w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col gap-1.5 text-center p-6">
                    <Link
                        to={"/"}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <Brain className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold text-foreground">
                            Second Brain
                        </span>
                    </Link>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">
                        Create an account
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Start building your second brain today
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 p-6 pt-0">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" error={errors.name?.message}>
                                Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="you@example.com"
                                {...register("name")}
                                error={errors.name?.message}
                            />
                            {errors.name && (
                                <p className="text-destructive text-sm">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="email"
                                error={errors.email?.message}
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email")}
                                error={errors.email?.message}
                            />
                            {errors.email && (
                                <p className="text-destructive text-sm">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="password"
                                error={errors.password?.message}
                            >
                                Password
                            </Label>
                            <PasswordField id="password" control={control} name="password"/>
                            {errors.password && (
                                <p className="text-destructive text-sm">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-6 pt-0">
                        <Button type="submit" className="w-full">
                            {isPending ? "Create account..." : "Create Account"}
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                            Already have an account?{" "}
                            <Link
                                to={"/signin"}
                                className="text-primary hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                        {errors.root && (
                            <p className="text-sm text-destructive text-center">
                                {`${errors.root.message}!`}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
