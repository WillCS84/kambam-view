import { showError, showSuccess } from "@/components/Toast"
import { api, apiMongo } from "@/services/Apis/api"

interface IUser {
  name: string
  email: string
  password: string
  profile: {
    code: string
    name: string
  }
}

export const saveUser = async (data: IUser) => {
  let payload = {
    name: data.name,
    password: data.password,
    email: data.email,
    id_profile: data.profile.code
  }
  return await api
    .post("/user", payload)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      if (error.response.data.error) {
        showError(error.response.data.message)
      }
    })
}

export const saveUserMongo = async (data: IUser) => {
  return await apiMongo
    .post("/connect", data)
    .then((res) => {})
    .catch((err) => console.log("erro", err))
}
