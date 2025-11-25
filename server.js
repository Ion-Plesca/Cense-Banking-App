import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/settings", settingRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
