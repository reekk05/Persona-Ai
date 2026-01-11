import express from "express"
import authMiddleware from "../middlewares/auth.js"
import {
    sendPrompt,
    getMessagesByChat,
} from "../controllers/messagesController.js"

const router = express.Router()

router.post("/", authMiddleware, sendPrompt)
router.get("/:chatId", authMiddleware, getMessagesByChat)

export default router