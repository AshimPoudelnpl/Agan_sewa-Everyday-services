import express from "express";
import dotenv from "dotenv";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 1. Find user by email only
    const [result] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const user = result[0];

    // 2. Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY }
    );

    // 4. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.id,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // set true in production (HTTPS)
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logout Successful" });
};
