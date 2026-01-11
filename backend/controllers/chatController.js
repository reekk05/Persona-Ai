import { createChat, deleteChatById } from "../models/chatModel.js";
import { deleteMessagesByChatId } from "../models/messageModel.js";


export const newChat = (req, res) => {
    try {
        const { title } = req.body
        const userId = req.user.id

        const result = createChat(userId, title || "New Chat")

        res.status(201).json({
            chatId: result.lastInsertRowid
        })
    } catch (error) {
        res.status(500).json({ message:"server error" })
    }
}

export const deleteChat = (req, res) => {
    try{
        const chatId = Number(req.params.chatId)
        const userId = req.user.id

        deleteMessagesByChatId(chatId)

        const result = deleteChatById(chatId, userId)

        if(result.changes === 0){
            return res.status(404).json({ message:"Chat not found" })
        } 
         res.json({message:"Chat deleted successfully"})
    }catch(error){
        console.error("CHAT CONTROLLER ERROR:", error)
        res.status(500).json({ message: error.message })

    }
}

import {getChatsbyUserId} from "../models/chatModel.js"

export const getUserChats = (req, res) => {
    try{
        const userId = req.user.id
        const chats = getChatsbyUserId(userId)
        res.json(chats)
    }catch (error){
        res.status(500).json({message:"Server Error"})
    }
}