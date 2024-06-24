import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  name: String,
  password: String
})

const User = models?.User || model("User", UserSchema)

export default User
