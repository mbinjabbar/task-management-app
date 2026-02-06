import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import authTask from "./middleware/auth.js";
import taskRoutes from "./routes/taskRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import statusRoutes from "./routes/statusRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/public", express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/task", authTask ,taskRoutes)

app.use("/api/categories", categoryRoutes);
app.use("/api/statuses", statusRoutes);

export default app;