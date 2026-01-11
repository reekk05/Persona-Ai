import express, { json } from "express"
import { registerUser, loginUser } from "../controllers/authController.js"
import authMiddleware from "../middlewares/auth.js"



const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Profile accessed",
        user: req.user
    })
})




export default router