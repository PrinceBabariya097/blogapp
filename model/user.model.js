import {  Schema, model } from "mongoose";
import {createHmac,randomBytes } from "node:crypto"
import { generateUserToken } from "../service/authentication.service.js";

const userSchema = Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    },
    coverImage:{
        type:String,
        default:'/image/default.jpg'
    }
})

userSchema.pre("save", function(next){
    const user = this

    if(!user.isModified("password")) return

    const salt = randomBytes(16).toString()

    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex")

    this.salt = salt
    this.password = hashedPassword

    next()

})

userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
    const user = await this.findOne({email})

    if(!user) return false

    const salt = user.salt
    const hashedpassword = user.password

    const userHashedPassword = createHmac("sha256",salt).update(password).digest("hex")

    if (!(hashedpassword === userHashedPassword)) return null

    const token = generateUserToken(user)

    return token
})

export const User = model('User', userSchema)


