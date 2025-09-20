// controllers/adminController.js
export const logoutAdmin = async (req, res) => {
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
};
