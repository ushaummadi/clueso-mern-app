// routes/taskRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// handle OPTIONS for this path
router.options("/", (req, res) => {
  res.sendStatus(204);
});

router
  .route("/")
  .get(protect, getTasks)
  .post(protect, createTask);

router
  .route("/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
