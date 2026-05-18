import express from "express"
import "dotenv/config"



const app = express();

app.set("PORT", process.env.PORT)


export default app