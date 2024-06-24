import { Schema, model, models } from "mongoose"

const TaskSchema = new Schema({
  description: String,
  situation: String,
  title: String,
  id_task: Number
})

const Task = models?.Task || model("Task", TaskSchema)

export default Task
