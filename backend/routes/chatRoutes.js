import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { deleteChat, newChat } from "../controllers/chatController.js";
import { getUserChats } from "../controllers/chatController.js";


const router = express.Router()

router.get("/", authMiddleware, getUserChats)

router.post("/new", authMiddleware, newChat)

router.delete("/:chatId", authMiddleware, deleteChat)

export default router
