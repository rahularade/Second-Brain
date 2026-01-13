import 'dotenv/config'
import express from "express";
import cors from "cors";
import { CORS_ORIGIN, PORT } from "./config.js";
import cookieParser from "cookie-parser";
import apiLimiter from "./middlewares/rateLimiter.js";
import rootRouter from "./routes/index.js";

const app = express();

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(apiLimiter);
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});
