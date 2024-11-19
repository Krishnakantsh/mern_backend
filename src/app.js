import express from "express";

import cors from "cors";

import cookieParser  from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// set json limit 

app.use(express.json({limit:"2mb"}))

// handle encoded urls

app.use(express.urlencoded({extended:true , limit:"5mb"})) 

// file folder store karne ke liye

app.use(express.static("public"))

// for reading and writing cookie 

app.use(cookieParser());

// routes 

import userRouter from './routes/user.routes.js'

// routes declaration 

app.use("/api/v1/users" , userRouter)




export {app} ;