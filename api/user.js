// user.js

import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

const router = Router();

/* ==============================
   Create User
============================== */
router.post("/user-create", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const trimName = name?.trim();
    const trimEmail = email?.trim().toLowerCase();
    const trimPassword = password?.trim();

    if (!trimName || !trimEmail || !trimPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const alreadyUser = await User.findOne({
      email: trimEmail,
    });

    if (alreadyUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name: trimName,
      email: trimEmail,
      password: trimPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

/* ==============================
   Get All Users
============================== */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }   //for admin view all users
});

/* ==============================
   Get Single User // for personal profile and edit page
============================== */
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

/* ==============================
   Update User
============================== */
router.put("/user-update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    const trimName = name?.trim();
    const trimEmail = email?.trim().toLowerCase();
    const trimPassword = password?.trim();

    if (!trimName || !trimEmail || !trimPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingEmail = await User.findOne({
      email: trimEmail,
      _id: { $ne: id },
    });

    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        name: trimName,
        email: trimEmail,
        password: trimPassword,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

/* ==============================
   Delete User
============================== */
router.delete("/user-delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const trimEmail = email?.trim().toLowerCase();
    const trimPassword = password?.trim();

    if (!trimEmail || !trimPassword) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email: trimEmail });

    // ✅ Email wrong
    if (!user) {
      return res.status(404).json({
        message: "Email not registered",
      });
    }

    // ✅ Password wrong
    if (user.password !== trimPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});
export default router;