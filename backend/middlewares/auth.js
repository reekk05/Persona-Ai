// import jwt from "jsonwebtoken"


// const authMiddleware = (req, res, next) => {
//     try{
//         const authHeader = req.headers.authorization

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({message:"Unauthorized"})
//         }

//         const token = authHeader.split(" ")[1]

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         req.user = decoded

//         next()
//     } catch (error) {
//         res.status(401).json({message: "Invalid or Expired token"})
//     }
// }


// export default authMiddleware

import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  console.log("🔍 AUTH HEADER:", req.headers.authorization)

  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - no bearer" })
    }

    const token = authHeader.split(" ")[1]
    console.log("🔍 TOKEN:", token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("✅ DECODED:", decoded)

    req.user = decoded
    next()
  } catch (error) {
    console.error("❌ AUTH ERROR:", error.message)
    return res.status(401).json({ message: error.message })
  }
}

export default authMiddleware
