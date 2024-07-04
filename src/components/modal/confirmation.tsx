import { Dialog } from "primereact/dialog"
import style from "./modal.module.css"
import { Button } from "primereact/button"
import { Dispatch, SetStateAction } from "react"

interface ModalProps {
  title: string
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  setConfirm: (event: boolean) => void
}

export default function Confirmation({ title, visible = true, setVisible, setConfirm }: ModalProps) {
  return (
    <Dialog
      header={
        <div className="flex justify-content-start p-3">
          <span>Confirmação</span>
        </div>
      }
      modal
      visible={visible}
      onHide={() => {
        if (visible) {
          setVisible(!visible)
        }
      }}
    >
      <div className={style.main}>
        <div className={style.title}>{title}</div>
        <div className={style.button}>
          <Button
            label="Confirma"
            severity="success"
            className="p-2 mx-1 w-5"
            onClick={() => {
              setConfirm(true)
              setVisible(false)
            }}
            rounded
          ></Button>
          <Button
            label="Cancela"
            severity="danger"
            className="p-2 mx-1 w-5"
            rounded
            onClick={() => {
              setConfirm(false)
              setVisible(false)
            }}
          ></Button>
        </div>
      </div>
    </Dialog>
  )
}
