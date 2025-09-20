// middleware/auth.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // token stored in cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains userId, role
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
