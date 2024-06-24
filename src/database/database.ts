import mongoose from "mongoose"

mongoose.set("strictQuery", true)

const connect = async () => {
  return await mongoose.connect("mongodb://admin:admin@localhost:27017/")
}

const disconnect = async () => {
  return await mongoose.disconnect()
}

const database = {
  connect,
  disconnect
}

export default database
