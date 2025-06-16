import express from "express";
import dotenv from 'dotenv';
import connectDB from "./db/connect.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

connectDB()
.then(() =>{
    app.listen(process.env.PORT, () => {
        console.log(`Server has Started at Port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB Connection Failed", err)
})