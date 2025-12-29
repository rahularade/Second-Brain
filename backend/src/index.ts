import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});
