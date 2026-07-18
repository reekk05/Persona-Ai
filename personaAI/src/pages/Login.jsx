import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { apiFetch } from '../api'
import {useNavigate} from "react-router-dom"


const Login = () => {
  const { setUser } = useAppContext()
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const url = isSignup ? "/api/users/register" : "/api/users/login"

      const body = isSignup
      ? {name, email, password}
      : {email, password}

      const data = await apiFetch(url, {
        method: "POST", 
        body: JSON.stringify(body)
      })
      console.log("Login response:", data)

      if (data.token) {
        localStorage.setItem("token", data.token)
      } else {
        localStorage.removeItem("token")
      }

      localStorage.setItem("user", JSON.stringify(data.user))

      setUser(data.user)
      navigate("/")
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* left image */}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="auth"
        />
      </div>

      {/* right form */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl font-medium text-gray-900">
            {isSignup ? "Create account" : "Sign in"}
          </h2>

          <p className="text-sm text-gray-500/90 mt-3">
            {isSignup
              ? "Create an account to get started"
              : "Welcome back! Please sign in to continue"}
          </p>

          {/* Name field (signup only) */}
          {isSignup && (
            <div className="flex items-center w-full mt-8 border border-gray-300/60 h-12 rounded-full pl-6">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-full bg-white text-gray-900 placeholder-gray-400 outline-none"
                required
              />
            </div>
          )}

          <div className={`flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 ${isSignup ? "mt-6" : "mt-8"}`}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full bg-white text-gray-900 placeholder-gray-400 outline-none"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full bg-white text-gray-900 placeholder-gray-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90"
          >
            {isSignup ? "Sign up" : "Login"}
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-indigo-400 cursor-pointer hover:underline"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
