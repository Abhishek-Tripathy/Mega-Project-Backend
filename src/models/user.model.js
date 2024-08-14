import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
   },
   fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
   },
   avatar: {
      type: String, //cloudinary
      required: true,
   },
   coerImage : {
      type: String,
   },
   watchHistory: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Video"
      }
   ],
   password: {
      type: String,
      required: [true, "Password is required"],

   },
   refreshTokens: {
      type: String,
   },
}, {timestamps: true})


userSchema.pre("save", async function (next) {
   if(this.isModifird("password")){
      this.password = bcrypt.hash(this.password, 10)
      next()
   }
})

userSchema.methods.isPasswordCorrect = async function(password) {
   await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         username: this.username,
         fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
   )
}

userSchema.methods.generateRefreshToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
   )
}


export const User = mongoose.model("User", userSchema)