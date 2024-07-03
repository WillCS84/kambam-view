import { api } from "@/services/Apis/api"

interface ITask {
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
