import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/settings", settingRoutes);

app.use("/api/forums", forumRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
