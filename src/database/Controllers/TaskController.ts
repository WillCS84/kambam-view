import database from "../database"
import Task from "../schema/taskSchema"

const saveTaskMongoDb = async (queryTask: any) => { 
  if (!database.connect()) return false

  const newTask = new Task(queryTask)

  const task = await newTask.save()
  return task
}

export { saveTaskMongoDb }
