import db from "../configs/db.js"

export const createMessage = (chatId, role, type, content) => {
    const stmt =db.prepare(
        "INSERT INTO messages (chat_id, role, type,  content) VALUES (?, ?, ?, ?)"
    )
    return stmt.run(chatId, role, type, content)
}


export const getChatMessages =(chatId) =>{
    const stmt =db.prepare(
        "SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC"
    )
    return stmt.all(chatId)
}

export const deleteMessagesByChatId = (chatId) => {
    const stmt = db.prepare(
        "DELETE FROM messages WHERE chat_id = ?"
    )
    return stmt.run(chatId)
}