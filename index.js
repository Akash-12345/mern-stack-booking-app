import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js"
import hotelRoute from "./api/routes/hotels.js"
import roomsRoute from "./api/routes/rooms.js"
import usersRoute from "./api/routes/users.js"
import Hotel from "./api/models/Hotel.js";


const app=express()
dotenv.config()
const connect= async()=>{
     try {
        await mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("CONNECTED TO MONGODB")
      } catch (error) {
        throw error
      };
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected")
})
//middleware

app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/users",usersRoute)

app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500
  const errorMessage=err.errorMessage||"sometig went wrong"
  return res.status(errorStatus).json(errorMessage)
})

app.listen(8000,()=>{
    connect()
    console.log("CONNECTED TO APPLICATION") 
})