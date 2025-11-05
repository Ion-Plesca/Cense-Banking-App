import express from "express";
import {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/incomesController.js";

const router = express.Router();

router.get("/:user_id", getIncomes);
router.post("/", addIncome);
router.put("/:id", updateIncome);
router.delete("/:id", deleteIncome);

export default router;
