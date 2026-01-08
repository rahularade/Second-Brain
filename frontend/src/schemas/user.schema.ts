import z from "zod";

const passwordSchema = z
    .string("Password is required.")
    .min(8, "Must be at least 8 characters.")
    .max(30, "Must be less than 30 characters.")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
    .regex(/\d/, "Must contain at least one number.")
    .regex(
        /[^A-Za-z0-9]/,
        "Must contain at least one special character."
    );

export const userSignupSchema = z.object({
    name: z
        .string("Name is required.")
        .trim()
        .min(3, "Must be at least 3 characters.")
        .max(30, "Must be less than 30 characters."),
    email: z
        .email({
            error: (email) =>
                email.input === "" || email.input === undefined
                    ? "Email is required."
                    : "Invalid email address.",
        })
        .trim()
        .toLowerCase(),
    password: passwordSchema,
});

export const userSigninSchema = userSignupSchema.pick({
    email: true,
    password: true,
});

export const changePasswordSchema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
});

export type UserSignupInput = z.infer<typeof userSignupSchema>;
export type UserSigninInput = z.infer<typeof userSigninSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
