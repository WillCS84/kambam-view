import { showError, showSuccess } from "@/components/Toast"
import { api } from "@/services/Apis/api"

interface IProfile {
  id_profile: number
  role: string
  description: string
}

export const saveProfile = async (data: IProfile) => {
  return await api
    .post("/profile", data)
    .then((res) => {
      if (!res.data.error) {
        showSuccess(res.data.message)
        return !res.data
      }
    })
    .catch((error) => {
      if (error.response.data.error) {
        showError(error.response.data.message)
      }
    })
}
