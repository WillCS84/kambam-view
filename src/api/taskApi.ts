import { apiMongo } from "@/services/Apis/api"

interface ITask {
  description: string
  title: string
  situation: string
}

export const saveTaskMongo = async (data: ITask) => {
  return await apiMongo
    .post("/task", data)
    .then((res) => {})
    .catch((err) => console.log("erro", err))
}
