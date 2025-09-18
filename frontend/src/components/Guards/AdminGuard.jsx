import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // install: npm install jwt-decode

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }
console.log(token)
  try {
    const decoded = jwtDecode(token); // { id, email, role, exp, ... }
console.log(decoded)
    // If token expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // If not admin
    if (decoded.role !== "admin") {
      return <Navigate to="/unauthorized" replace />;
    }

    return children; // ✅ Admin access granted
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;
