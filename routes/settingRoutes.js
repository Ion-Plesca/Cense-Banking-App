import express from "express";

import{
    getSettings,
    addSettings,
    updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/:user_id", getSettings);
router.post("/", addSettings);
router.put("/:id", updateSettings);

export default router;