import express from "express";
import userRouter from "./user.js";
import contentRouter from "./content.js";
import brainRouter from "./brain.js";
import tagRouter from "./tags.js";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/content", contentRouter);
rootRouter.use("/brain", brainRouter);
rootRouter.use("/tags", tagRouter);


export default rootRouter;