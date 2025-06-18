import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors ({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// import routes
import { router as userRouter } from "./routes/user.routes.js";

//declare routes
app.use("/api/v1/user", userRouter)

export { app }
