import User from "../models/user.model.js"

export const getAllUsers = async function() {
  const users = await User.findAll()
  console.log(users.map(user => user.toJSON())) // Convert to plain objects
}

export const addUser = async function (userData) {
  try {
    const newUser = await User.create(userData)
    console.log("User added:", newUser.toJSON())
    return newUser
  } catch (error) {
    console.error("Error adding user:", error)
  }
}