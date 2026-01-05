import z from "zod";

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be less than 30 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
    );

export const userSignupSchema = z.object({
    name: z
    .string("Name is required")
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be less than 30 characters"),
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: passwordSchema,
});

export const userSigninSchema = userSignupSchema.pick({
    email: true,
    password: true
})

export const changePasswordSchema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
});