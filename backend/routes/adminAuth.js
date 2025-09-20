// routes/adminAuth.js
import express from 'express'
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../midlewares/authMiddleware.js';
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }).json({
      token,
      success: true,
      message: "Admin Login SUccesfully"
    });
  } else {
    return res.status(200).json({
      message: 'Invalid admin credentials',
      success: false,
    });
  }
});
router.get("/me", authMiddleware, (req, res) => {
  res.json({ id: req.user.id, role: req.user.role, email: req.user.email });
});
router.post('/logout', async (req, res) => {
  try {
    // Clear cookie (set empty value + expire immediately)
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in production
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "✅ Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "❌ Logout failed. Please try again.",
      error: error.message,
    });
  }
})
export default router


