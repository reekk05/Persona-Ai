import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import "./configs/db.js"
import userRoutes from "./routes/authRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import messageRoutes from  "./routes/messageRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)


app.get('/', (req, res)=> res.send('Server is Live'))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})