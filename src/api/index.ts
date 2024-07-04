import { showError } from "@/components/Toast"
import { api } from "@/services/Apis/api"

interface ILogin {
  email: string
  password: string
}

export interface IResponse {
  error: boolean
  message: string
  response?: {
    user: object
    profile: Array<[]>
  }
}

export const authLogin = async (data: ILogin) => {
  return await api
    .post("/login", data)
    .then((res) => {
      if (!res.data.error) {
        return res.data
      }
    })
    .catch((error) => {
      if (error.response.data.error) {
        showError(error.response.data.message)
      }
      return error.response.data
    })
}
