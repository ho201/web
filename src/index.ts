import express from "express";
import { env } from "./config/env.js";
import { db } from "./db/db.js"

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/db-test", async (req, res) => {
    try {
        await db.query("SELECT 1");
        res.send("DB Connected ✅");
    } catch {
        res.send("DB Failed ❌");
    }
});

app.listen(env.PORT, () => {
    console.log(`Server running http://localhost:${env.PORT}`);
});