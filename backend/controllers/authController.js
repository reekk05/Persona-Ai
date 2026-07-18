import bcrypt from "bcryptjs"
import { createUser, findUserByEmail } from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body


        if(!name || !email || !password) {
            return res.status(400).json({message:"All fields are required"})
        }
        const existingUser = findUserByEmail(email)
if(existingUser){
    return res.status(400).json({message:"User already exists"})
}

const hashedPassword = await bcrypt.hash(password, 10)

const result = createUser(name, email, hashedPassword)

const token = jwt.sign(
    {id: result.lastInsertRowid, email},
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
)

res.status(201).json({
    token,
    user:{
        id: result.lastInsertRowid,
        name,
        email
    }
})
} catch (error) {
    res.status(500).json ({message: "Server Error"})
}
    }

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({message: "All feilds are required"})
        }

        const user= findUserByEmail(email)
        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const isMatch =await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token =jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.json({
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error){
        res.status(500).json({message: "Server Error"})
    }
}

