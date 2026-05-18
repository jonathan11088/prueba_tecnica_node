import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser";

import { authRoute } from "./routes/auth_route.js";
import { productsRoute } from "./routes/products_route.js";
import cors from 'cors'



const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500/',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(cookieParser())



app.use(authRoute)
app.use(productsRoute)

app.set("PORT", process.env.PORT)


export default app