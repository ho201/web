import express from "express";
import cookieParser from "cookie-parser";
import {env} from "./config/env.js";
import { db } from "./db/db.js";

import {authRoutes} from "./routes/authRoutes.js";
import {examRoutes} from "./routes/examRoutes.js";
import {questionRoutes} from "./routes/questionRoutes.js";
import {answerRoutes} from "./routes/answerRoutes.js";
import {sessionRoutes} from "./routes/sessionRoutes.js";
import {userRoutes} from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

db.getConnection()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("DB connection failed:", err.message);
    });


app.use("/auth", authRoutes);
app.use("/exams", examRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/sessions", sessionRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Question System API is running "
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);

    res.status(500).json({
        message: "Internal server error",
        error: err.message
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Server running on port http://localhost:${PORT}`);
});

