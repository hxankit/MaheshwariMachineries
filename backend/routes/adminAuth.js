// routes/adminAuth.js
import express from 'express'
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../midlewares/authMiddleware.js';
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(process.env.ADMIN_EMAIL);
  
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log(token);
    
    return res.status(200).cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }).json({
      token,
     success:true,
      message:"Admin Login SUccesfully"
     });
  } else {
    return res.status(200).json({
       message: 'Invalid admin credentials', 
      success:false,
      });
  }
});
router.get("/me", authMiddleware, (req, res) => {
  res.json({ id: req.user.id, role: req.user.role, email: req.user.email });
});
export default router


