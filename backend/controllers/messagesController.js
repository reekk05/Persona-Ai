import { generateImage, generateText } from "../services/aiServices.js";
import { createMessage, getChatMessages } from "../models/messageModel.js";
import {getChatById, updateChatTitle} from "../models/chatModel.js"

export const sendPrompt = async (req, res) => {
    try{
        const{prompt, mode} = req.body
        const chatId =Number(req.body.chatId)

        if (!chatId || !prompt){
            return res.status(400).json({ message: "chatId and prompt are required"})
        }

        const chat = getChatById(chatId)
        if(!chat) {
            return res.status(404).json({message: "Chat not found"})
        }



        createMessage(chatId, "user", "text", prompt)

        let response
        if (mode === "image"){
            response = await generateImage(prompt)
            createMessage(chatId, "assistant", "image", response)
        } else {
            response = await generateText(prompt)
            createMessage(chatId, "assistant", "text", response)
        }


        if (chat.title ==="New Chat") {
            const trimmed = prompt.trim()
            const title = trimmed.length > 40
            ? trimmed.slice(0, 40) + "..." : trimmed
            updateChatTitle(chatId, title)
        }

        res.json({ type: mode, response})
    } catch (error) {
        console.error(" SEND PROMPT ERROR:", error)
        res.status(500).json({ message: error.message })
    }
}

export const getMessagesByChat = (req, res) => {
    try{
        const chatId=req.params.chatId
        const messages = getChatMessages(chatId)
        res.json(messages)
    }catch(error){
console.error("DB / MESSAGE ERROR:", error)
        res.status(500).json({ message: "error.message"})
    }
}