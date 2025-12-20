import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
import { connectDB } from "./db/connect";

const app = express();

app.use(cors()); // allow frontend to call the backend
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
})
}

startServer();