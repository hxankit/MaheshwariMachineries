import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

// Routes
import adminAuth from "./routes/adminAuth.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import contactRouter from "./routes/contact.route.js";

// DB
import { connectdb } from "./db/connectdb.js";

// __dirname fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/admin", adminAuth);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/contacts", contactRouter);

// Serve frontend build (for production)
const frontendDistPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));

// Serve index.html for all frontend routes (SPA)
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
