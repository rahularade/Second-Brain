import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { userSigninSchema, type UserSigninInput } from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "../components/ui/Label";
import PasswordField from "../components/PasswordField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../api/auth";
import { toast } from "sonner";

const Signin = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSigninInput>({
        resolver: zodResolver(userSigninSchema),
        defaultValues: {
            email: "",
            password:""
        }
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: signin,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]})
            toast.success("Signed in successfully.")
        },
        onError: (error) => {
            toast.error(`${error.message}.`)
        },
    });

    const onSubmit = (data: UserSigninInput) => {
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
                        Welcome back
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Sign in to your account to continue
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 p-6 pt-0">
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
                            <PasswordField
                                id="password"
                                control={control}
                                name="password"
                            />
                            {errors.password && (
                                <p className="text-destructive text-sm">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-6 pt-0">
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Signing in..." : "Sign In"}
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                            Don't have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="text-primary hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
