import { api } from "@/services/Apis/api"

interface IUser {
  name: string
  email: string
  password: string
}

export const saveUser = async (data: IUser) => {
  let payload = {
    name: data.name,
    password: data.password,
    email: data.email
  }
  return await api
    .post("/user", payload)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      if (error.response.data.error) {
        return error.response.data
      }
    })
}
