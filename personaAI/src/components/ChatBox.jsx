import React, { useEffect, useRef, useState } from 'react'
import {useAppContext} from '../context/AppContext'
import {assets} from '../assets/assets'
import Message from './Message'
import {apiFetch} from "../api"

const ChatBox = () => {
  

  const containerRef = useRef(null)
  const {selectedChat, theme} = useAppContext()
  const isChatSelected = Boolean(selectedChat)

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const [prompt, setprompt] = useState("")
  const [mode, setMode] = useState('text')

  const abortRef = useRef(null)

  useEffect(()=> {
    console.log("Selected chat changed:", selectedChat)
    if (selectedChat?.messages) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(()=> {
    if (containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages])

const onSubmit = async (e) => {
  e.preventDefault()
  if(!prompt.trim()) return

const chatId = Number(selectedChat?.id)
if(!chatId) {
  alert("Invalid chat selacted")
  return
}
    
const userPrompt = prompt
  setprompt("")
  setLoading(true)

  const controller = new AbortController()
  abortRef.current = controller



  try{
    setMessages(prev => [
      ...prev,
      {role: "user", type: mode, content: userPrompt}
    ])

    const data = await apiFetch("/api/messages", {
      method:"POST", 
      body:JSON.stringify({
        chatId,
        prompt: userPrompt, 
        mode
      }),
      signal: controller.signal
    })

    setMessages((prev)=> [
      ...prev,
      {
        role: "assistant", 
        type: data.type,
        content: data.response
      }
    ])


  } catch(err) {
    if (err.name === "AbortError"){
      console.log("Request aborted")
    } else {
    alert(err.message)}
  }finally{
    setLoading(false)
    abortRef.current=null
  }
}

console.log("sending message to chatid: ", selectedChat?.id)

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30
    max-md:mt-14 2xl:pr-40 dark:invert'>
      {/*chat messeges*/}
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2
          text-primary' >
            <img src={theme=== 'dark' ? assets.logo_search_dark : assets.logo_search_light} alt="loading" 
            className='w-full max-w-56 sm:max-w-68 dark:invert'  />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:invert '>
              Go Ahead Ask Me Anything!
            </p>
          </div>
        )}

        {messages.map((messages, index)=> <Message key={index} message={messages} />)}


    {/*Loading icon*/}
    {
      loading && <div className='relative overflow-visible flex justify-center py-8'>
        <div className="typewriter-wrapper">
        <div className="typewriter">
            <div className="slide"><i></i></div>
            <div className="paper"></div>
            <div className="keyboard"></div>
        </div>
      </div>
    </div>
    }
      </div>

    {/*prompt box*/}

    <form 
      onSubmit={isChatSelected ? onSubmit : (e) => e.preventDefault()}
        className={`bg-primary/20 dark:bg-[#583C79]/30 border border-primary 
        dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto 
        flex gap-4 items-center ${!isChatSelected ? "opacity-50 cursor-not-allowed" : ""}`}>
        <select onChange={(e)=>setMode(e.target.value)} value={mode}
        className='text-sm pl-3 pr-2 outline-none'>
          <option className='dark:bg-blue-600 dark:invert' value="text">Text</option>
          <option className='dark:bg-blue-600 dark:invert' value="image">Image</option>
        </select>
        <input disabled= {!isChatSelected} onChange={(e)=>setprompt(e.target.value)} value={prompt} type="text" placeholder={isChatSelected ? "Type Here..." : "Select a chat to start"} className='flex-1 w-full text-sm outline-none dark:invert' required />
        <button className= "dark:invert" type='button' disabled= {!isChatSelected} onClick={() => {
          if (loading && abortRef.current) {
            abortRef.current.abort()
            setLoading(false)
          } else if (!loading) {
            onSubmit(new Event("submit"))
          }
        }} >
          <img src={loading ? assets.stop_logo : assets.send_icon} className='w-8 cursor-pointer dark:invert' alt="prompt button" />  
        </button>    
    </form>

    </div>
  )
}

export default ChatBox
