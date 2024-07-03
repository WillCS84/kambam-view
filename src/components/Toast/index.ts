import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react"

import toast from "react-hot-toast"
import { IoAlert } from "react-icons/io5"

interface showConfirmationProps {
  text: string
  onClickNo: () => void
  onClickYes: () => void
  open?: boolean
  title: string
  color?: string
}

export const showSuccess = (msg: string) => {
  toast.success(msg, { duration: 2000 })
}

export const showError = (error: string) => {
  toast.error(error, { duration: 2000 })
}
