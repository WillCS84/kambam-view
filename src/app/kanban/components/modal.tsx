"use client"
import { Dialog } from "primereact/dialog"

export default function Modal({ visible, setVisible, title, children }: any) {
  return (
    <Dialog
      header={
        <div className="flex justify-content-center">
          <span>{title}</span>
        </div>
      }
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
    >
      {children}
    </Dialog>
  )
}
