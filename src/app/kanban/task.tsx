"use client"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import style from "./kanban.module.css"

export default function Task({ visible, setVisible }: any) {
  return (
    <Dialog
      header="Tarefas"
      visible={visible}
      style={{
        width: "40vw",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
      modal
      onHide={() => {
        setVisible(false)
      }}
    ></Dialog>
  )
}
