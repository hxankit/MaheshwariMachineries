import express from 'express'
import adminAuth from './routes/adminAuth.js'
import fs from "fs"



const swaggerDoc = JSON.parse(fs.readFileSync("./scripts/swagger.json", "utf-8"));


import swaggerUi from "swagger-ui-express"
import categoryRouter from './routes/category.route.js'
import productRouter from './routes/product.route.js'
import contactRouter from './routes/contact.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { connectdb } from './db/connectdb.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.get("/", (req, res) => {
    res.json("server is working")
})
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDoc))
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/api/admin/', adminAuth)
app.use("/api/products",productRouter)
app.use('/api/categories', categoryRouter);
app.use('/api/contacts', contactRouter);

connectdb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);

    })
})
