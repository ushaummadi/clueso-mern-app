// backend/routes/userRoutes.js
import express from "express";
import { User } from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * GET /api/user/profile
 * Return current logged-in user (without password)
 */
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("GET /api/user/profile error", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/user/profile
 * Update profile fields like name
 */
router.put("/profile", protect, async (req, res) => {
  try {
    const { name } = req.body;
    const updates = {};
    if (name) updates.name = name;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("PUT /api/user/profile error", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
