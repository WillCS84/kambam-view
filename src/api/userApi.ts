import { api } from "@/services/Apis/api"

export interface IUser {
  id_user?: string
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

export const removeUser = async (user: IUser) => {
  return await api
    .delete("/user", { data: { id_user: user.id_user } })
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      if (error.response.data.error) {
        return error.response.data
      }
    })
}
