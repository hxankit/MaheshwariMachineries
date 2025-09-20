// middleware/isAdmin.js
import  jwt from  'jsonwebtoken'

export const isAdmin = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

