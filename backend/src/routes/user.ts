import { Router } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();

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

const userSchema = z.object({
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: passwordSchema,
});

const changePasswordSchema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
});

const options = {
    httpOnly: true,
    secure: true,
};

userRouter.post("/signup", async (req, res) => {
    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.issues[0].message,
        });
    }

    const { email, password } = parsedData.data;

    const hashedPassword = await bcrypt.hash(password, 9);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).cookie("token", token, options).json({
            message: "User created successfully",
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            res.status(409).json({
                message: "Email already exist",
            });
        } else {
            res.status(500).json({
                message: "Sign up failed. Try again later.",
            });
        }
    }
});

userRouter.post("/signin", async (req, res) => {
    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.issues[0].message,
        });
    }

    const { email, password } = parsedData.data;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).cookie("token", token, options).json({
            message: "Signed in successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Sign in failed. Try again later.",
        });
    }
});

userRouter.post("/signout", auth, (req, res) => {
    res.status(200).clearCookie("token", options).json({
        message: "Signed out successfully",
    });
});

userRouter.post("/change-password", auth, async (req, res) => {
    const parsedData = changePasswordSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.issues[0].message,
        });
    }

    const { oldPassword, newPassword } = parsedData.data;

    if (oldPassword.toLowerCase() === newPassword.toLowerCase()) {
        return res.status(400).json({
            message: "New password must be different from the old password.",
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid old password",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 9);

        await prisma.user.update({
            where: {
                id: req.userId,
            },
            data: {
                password: hashedPassword,
            },
        });

        res.status(201).json({
            message: "Password Changed successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Failed to change password. Try again later.",
        });
    }
});

userRouter.get("/me", auth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
            omit: {
                password: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user,
        });
    } catch (error) {}
});

export default userRouter;
