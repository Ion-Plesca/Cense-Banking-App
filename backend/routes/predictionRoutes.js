import express from "express";
import { getPredictions } from "../controllers/predictionController.js";

const router = express.Router();

router.get("/:user_id", getPredictions);

export default router;
