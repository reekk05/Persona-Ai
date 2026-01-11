import db from "../configs/db.js"

export const createUser = (name, email, password) => {
  const stmt = db.prepare(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
  )
  return stmt.run(name, email, password)
}

export const findUserByEmail = (email) => {
  const stmt = db.prepare(
    "SELECT * FROM users WHERE email = ?"
  )
  return stmt.get(email)
}

export const findUserById = (id) => {
  const stmt = db.prepare(
    "SELECT id, name, email FROM users WHERE id = ?"
  )
  return stmt.get(id)
}
