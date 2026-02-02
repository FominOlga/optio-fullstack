import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes";

dotenv.config();
import { connectDB } from "./db/connect";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
); // allow frontend to call the backend

app.use(express.json());

app.use("/api", routes); // Mount all API routes under /api
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5050;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
