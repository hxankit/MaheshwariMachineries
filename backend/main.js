import express from 'express'
import adminAuth from './routes/adminAuth.js'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.route.js'
import cookieParser from 'cookie-parser'
const app =express()
app.use(express.json())
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.json("server is working")
})

app.use('/api/admin/',adminAuth)
app.use('/api/products',  productRoutes); 
app.use('/api/categories', categoryRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
    
})