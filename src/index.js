import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({path: './env'})


connectDB()
.then(() => [
   app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      
   })
])
.catch((error) => {
   console.log("MongoDB connection failed" ,error);
})







// import express from "express"
// const app = express()

// ;( async () => {
//    try {
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on( (error) => {
//          console.log("Error in express connection: ", error)
//          throw error
//       })

//       app.listen(process.env.PORT, () => {
//          console.log(`App id listening on port ${process.env.PORT}`);  
//       })
//    } catch (error) {
//       console.error("Error: ", error)
//       throw error
//    }
// } ) ()