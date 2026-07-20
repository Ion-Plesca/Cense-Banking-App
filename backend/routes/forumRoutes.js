import express from "express";
import {
  getThreads,
  getThreadById,
  createThread,
  addComment
} from "../controllers/forumController.js";

const router = express.Router();

router.get("/", getThreads);
router.get("/:id", getThreadById);
router.post("/", createThread);
router.post("/:id/comments", addComment);

export default router;
