import { api } from "@/services/Apis/api"

interface ITask {
  id_task?: number
  description: string
  title: string
  status: number
}

export const saveTask = async (data: ITask) => {
  return await api
    .post("/task", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      if (error.response.data.error) {
        return error.response.data
      }
    })
}

export const getTasks = async () => {
  return await api.get("/task")
}

export const updateTask = async (task: ITask) => {
  return await api
    .put("/task", task)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      if (error.response.data.error) {
        return error.response.data
      }
    })
}

export const deleteTask = async (id_task: number) => {
  return await api
    .delete("/task", { data: { id_task: id_task } })
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      if (error.response.data.error) {
        return error.response.data
      }
    })
}
