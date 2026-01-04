import 'dotenv/config'
import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import cookieParser from "cookie-parser";
import apiLimiter from "./middlewares/rateLimiter.js";
import rootRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(apiLimiter);
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});
