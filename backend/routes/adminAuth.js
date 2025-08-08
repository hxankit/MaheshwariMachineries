// routes/adminAuth.js
import express from 'express'
import jwt from 'jsonwebtoken'
const router = express.Router();

export default router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log(token);
    
    return res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }).json({
     
      message:"Admin Login SUccesfully"
     });
  } else {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }
});


