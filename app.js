import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser";

import { authRoute } from "./routes/auth_route.js";
import { productsRoute } from "./routes/products_route.js";



const app = express();

app.use(express.json())
app.use(cookieParser())



app.use(authRoute)
app.use(productsRoute)

app.set("PORT", process.env.PORT)


export default app