import { CookieOptions, Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import auth from "../middlewares/auth.js";
import { changePasswordSchema, userSchema } from "../schemas/user.schema.js";

const userRouter = Router();

const SALT_ROUNDS = 9;

const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

userRouter.post("/signup", async (req, res) => {
    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: parsedData.error.issues[0].message,
        });
    }

    const { email, password } = parsedData.data;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

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

        res.status(200).cookie("token", token, options).json({
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

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        await prisma.user.update({
            where: {
                id: req.userId,
            },
            data: {
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).cookie("token", token, options).json({
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
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user. Try again later.",
        });
    }
});

userRouter.delete("/me", auth, async (req, res) => {
    try {
        const result = await prisma.user.deleteMany({
            where: {
                id: req.userId!,
            },
        });

        if (result.count === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).clearCookie("token", options).json({
            message: "User account deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete account. Try again later.",
        });
    }
});

export default userRouter;
