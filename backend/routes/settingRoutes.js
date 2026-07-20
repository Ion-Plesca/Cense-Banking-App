import express from "express";
import multer from "multer";

import {
  getSettings,
  addSettings,
  updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `user_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.put("/users/:id", upload.single("profile_picture"), updateSettings);
router.get("/:user_id", getSettings);
router.post("/", addSettings);

export default router;
