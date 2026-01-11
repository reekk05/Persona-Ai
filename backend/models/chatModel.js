import db from "../configs/db.js"

export const createChat =(userId, title) => {
    const stmt = db.prepare(
        "INSERT INTO chats (user_id, title) VALUES (?, ?)"
    )
    return stmt.run(userId, title)
}


export const getUserChats = (userId) => {
    const stmt = db.prepare(
        "SELECT * FROM CHATS WHERE user_id = ? ORDER BY created_at DESC"
    )
    return stmt.all(userId)
}

export const getChatById = (chatId) => {
    const stmt = db.prepare("SELECT * FROM chats WHERE id = ?")
    return stmt.get(chatId)
}

export const updateChatTitle = (chatId, title) => {
    const stmt = db.prepare("UPDATE chats SET title = ? WHERE id = ?")
    return stmt.run(title, chatId)
} 

export const deleteChatById = (chatId, userId) => {
    const stmt = db.prepare(
        "Delete FROM chats WHERE id = ? AND user_id = ?"
    )
    return stmt.run(chatId, userId)
}

export const getChatsbyUserId = (userId ) => {
    const stmt =db.prepare(
        "SELECT * FROM chats WHERE user_id = ? ORDER BY created_at DESC"
    )
    return stmt.all(userId)
}