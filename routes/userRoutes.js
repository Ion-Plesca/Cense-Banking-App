import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  updateUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserDetails);
router.put("/:id", updateUser);

export default router;
