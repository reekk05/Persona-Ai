import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api";


const AppContext = createContext()

export const AppContextProvider = ({ children })=>{
    
    const [user, setUser] = useState(undefined);

    const [chats, setChats] = useState([]);

    const [selectedChat, setSelectedChat] = useState(null)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

        const fetchUser = async () => {
        const savedUser = JSON.parse(localStorage.getItem("user"))
        setUser(savedUser || null)
    }

    const fetchChats = async () => {
        try{
            const data = await apiFetch("/api/chats")
            setChats(data)
        } catch (err){
            console.error("Failed to fetch chats", err)
        }
    }

        useEffect(()=>{
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (token && user) {
            setUser(JSON.parse(user))
            fetchChats()
        }
    }, [])

    const value = {user, setUser, chats, setChats, selectedChat, setSelectedChat, theme, setTheme, fetchUser, fetchChats}
    
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext)