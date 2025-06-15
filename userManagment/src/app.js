import express from "express";
import dotenv from "dotenv";
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
import customerRoutes from './routes/digitalMarketerRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from "./config/database.js";
import cors from 'cors'


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
dotenv.config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
connectDB();




app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)
app.use('/customer', customerRoutes)
app.use('/user', userRoutes)




const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("PORT started at: " + PORT);
})

console.log("hello world");