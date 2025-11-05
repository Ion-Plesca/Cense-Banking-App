import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserDetails); 

export default router;
