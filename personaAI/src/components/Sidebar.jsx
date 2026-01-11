import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api'

const Sidebar = ({isMenuOpen, setIsMenuOpen}) => { 
  const ctx = useAppContext?.() || {}
  const {
    chats: rawChats = [],
    setChats,
    setSelectedChat,
    theme = 'light',
    user = null,
    setUser
  } = ctx

  const handleNewChat = async () => {
    try{
      const data = await apiFetch("/api/chats/new", {
        method: "POST",
        body: JSON.stringify({title: "New Chat"})
      })

      const newChat ={
        id: data.chatId,
        name: "New Chat",
        messages : []
      }

      ctx.setChats?.((prev) => [newChat, ...prev])
      setSelectedChat(newChat)
      navigate("/")
      setIsMenuOpen(false)
    } catch (err){
      alert(err.message)
    }
  }




  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }


  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const chats = Array.isArray(rawChats) ? rawChats : []

  const filterMatches = (chat) => {
    const firstMsg = chat?.messages?.[0]?.content ?? ''
    const name = chat?.name ?? ''
    const hay = (firstMsg || name).toString().toLowerCase()
    return hay.includes(search.toLowerCase())
  }

    const openChat = async (chat) => {
    try{
      const messages = await apiFetch(`/api/messages/${chat.id}`)

      setSelectedChat({ ...chat, messages })
      navigate ("/")
      setIsMenuOpen(false)
    }catch (err) {
      alert(err.message)
    }
  }

    const handleDeleteChat = async (chatId) => {
      try{
        await apiFetch(`/api/chats/${chatId}`, {method: "DELETE"})
       
        ctx.setChats(prev => prev.filter(c=> c.id !== chatId))
        
        if (ctx.setSelectedChat?.id === chatId) {
        ctx.setSelectedChat(null)
        }
      } catch (err) {
        alert(err.message)
      }
    }

          
  return (
    <div className={`flex flex-col h-screen w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 
      border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>

{/* Logo */}
      <img
        src={theme === 'dark' ? assets.logo_search_dark : assets.logo_search_light}
        alt="sidebar logo"
        className="w-full max-w-48"
        onError={(e) => { e.currentTarget.style.filter = 'invert(1)'; /* fallback visual tweak */ }}
      />

      {/* New Chat */}
      <button
        type="button"
        onClick={handleNewChat}
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl
          focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium
          rounded-base text-sm px-4 py-2.5 text-center leading-5 mt-3"
      >
        <span className="mr-2 text-xl"> + </span>New Chat
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img src={assets.search_icon} className="w-4 not-dark:invert" alt="search icon" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversations"
          className="text-xs placeholder:text-gray-400 outline-none w-full"
        />
      </div>

{/* Recent Chats label */}
  {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}

{/* Chats list */}
  <div className="overflow-y-auto flex-1 mt-2 pr-1">
    {chats
      .filter(filterMatches)
      .map((chat, idx) => (
        <div
        onClick={() => openChat(chat)}
        key={chat.id ?? chat._id ?? idx}
        className="group flex items-center justify-between p-3 mt-2
        hover:bg-white/10 rounded-md cursor-pointer transition-all"
        >
        <div className='flex flex-col'>
          <p className="text-sm font-medium">{chat?.name ?? 'Untitled Chat'}</p>
          <p className="text-xs text-gray-400 truncate">
            {chat?.messages?.[0]?.content ?? ''}
          </p>
          <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
            {chat.updatedAt ? moment(chat.updatedAt).fromNow() : ''}
          </p>
        </div>


        {/*delete chats*/}
        <img
          src={assets.bin_logo_light}
          alt='delete chats'
          className='hidden group-hover:block w-4 cursor-pointer ml-3 shrink-0 not-dark:invert'
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteChat(chat.id)
          }}
        />
      </div>
    ))}
</div>


{/*dark mode*/}
<div>
<label className="relative inline-flex cursor-pointer select-none items-center group">
  <input
    type="checkbox"
    id="theme-switcher-two"
    className="sr-only"
    onChange={(e) => {
      const isDark = e.target.checked
      document.documentElement.classList.toggle("dark", isDark)
      ctx.setTheme?.(isDark ? "dark" : "light")
    }}
  />

  <span className="label text-sm font-medium text-dark dark:text-white"></span>

  <span className="mx-4 flex h-8 w-[60px] items-center rounded-full bg-[#CCCCCE] p-1 duration-200 group-has-checked:bg-dark">
    <span className="h-6 w-6 rounded-full bg-white duration-200 group-has-checked:translate-x-7"></span>
  </span>

  <span className="label text-sm font-medium text-dark dark:text-white">Dark Mode</span>
</label>
</div>

{/*user account*/}

<div className='group flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
  <img src={assets.user_logo} className='w-7 rounded-full dark:invert' alt='user pic' />
  <p className='flex-1 text-sm dark:text-primary truncate dark:invert'>
    {user ? user.name:'Login to your account' }
  </p>
  {user && (
  <img src={ assets.logout_logo }
  onClick={(e)=>{
    e.stopPropagation()
    handleLogout()
  }}
  
  className='hidden group-hover:inline-block h-5 cursor-pointer not-dark:invert' alt='logout' /> )}
</div>
<img onClick={()=> setIsMenuOpen(false)} src={assets.cross_logo} className='absolute top-3 right-3 w-5 h-5
cursor-pointer md:hidden not-dark:invert' alt='close sidebar' />
</div>
)
}


export default Sidebar
