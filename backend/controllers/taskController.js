// controllers/taskController.js
import { Task } from "../models/Task.js";

// LIST TASKS
export const getTasks = async (req, res, next) => {
  try {
    const { search = "", status = "all", priority = "all" } = req.query;

    const query = { owner: req.user.id };

    if (status && status !== "all") query.status = status;
    if (priority && priority !== "all") query.priority = priority;
    if (search) query.title = { $regex: search, $options: "i" };

    console.log("GET /tasks user id:", req.user.id);
    console.log("GET /tasks query:", query);

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    console.log("FOUND tasks:", tasks.length);

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};
// CREATE TASK
export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority = "medium" } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status: "pending",
      priority,
      owner: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// UPDATE TASK
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// DELETE TASK
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
