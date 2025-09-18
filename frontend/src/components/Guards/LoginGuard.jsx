import { Navigate } from "react-router-dom";

function LoginGuard({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    // Not logged in
    return <Navigate to="/admin" replace />;
  }

  try {
    if(!token){

        return children; // ✅ Admin access granted
    }
  } catch (error) {
    console.error("Invalid token:", error);
   
  }
}

export default LoginGuard;
