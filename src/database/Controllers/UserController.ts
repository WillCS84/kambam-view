import database from "../database"
import User from "../schema/userSchema"

const saveUserMongoDB = async (queryUser: any) => {
  if (!database.connect()) return false

  const newUser = new User(queryUser)
  return await newUser.save()
}

export { saveUserMongoDB }
