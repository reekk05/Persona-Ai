import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import Login from './pages/Login'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { user, fetchUser } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  if (user === undefined) {
    return <Loading /> 
  }

  if (user === null) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-slate-950">
        <Login />
      </div>
    )
  }

  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          alt="menu"
          className="absolute top-3 left-3 w-8 cursor-pointer md:hidden"
          onClick={() => setIsMenuOpen(true)}
        />
      )}

      <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
        <div className="flex h-screen w-screen">
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Routes>
            <Route path="/" element={<ChatBox />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
