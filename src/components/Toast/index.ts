import toast from "react-hot-toast"

export const showSuccess = (msg: string) => {
  toast.success(msg, { duration: 2000 })
}

export const showError = (error: string) => {
  toast.error(error, { duration: 2000 })
}
