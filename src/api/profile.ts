import { showError, showSuccess } from "@/components/Toast"
import { api } from "@/services/Apis/api"

export interface IProfile {
  role: string
  description: string
}

export const saveProfile = async (data: IProfile) => {
  return await api
    .post("/profile", data)
    .then((res) => {
      if (!res.data.error) {
        showSuccess("Perfil Criado com sucesso!")
        return res.data
      }
    })
    .catch((error) => {
      if (error.response.data.error) {
        showError(error.response.data.message)
      }
    })
}

export const getProfiles = async () => {
  return await api
    .get("/profile")
    .then((res) => {
      if (!res.data.error) {
        return res.data
      }
    })
    .catch((error) => {
      if (error.response.data.error) {
        showError(error.response.data.message)
      }
    })
}
