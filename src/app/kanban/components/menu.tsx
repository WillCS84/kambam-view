"use client"
import Link from "next/link"
import style from "../kanban.module.css"
import { IoHomeOutline } from "react-icons/io5"
import { Button } from "primereact/button"
import { useState } from "react"
import Modal from "./modal"
import CreateTask from "./createTask"

interface IUser {
  name: string
  id_profile: number
}

export default function MenuKanban() {
  const [user, setUser] = useState<IUser>()
  const [permission, setPermission] = useState(false)
  const [children, setChildren] = useState<React.ReactNode>()
  const [title, setTitle] = useState("")
  const [visible, setVisible] = useState(false)

  return (
    <div className={style.menu}>
      <div className={style.menu_header}>
        <div className="flex justify-content-between">
          <div>
            <Link className={style.link} href="/">
              <IoHomeOutline size={25} />
              <span className="px-1 mx-1">
                <strong>{user?.name}</strong>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className={style.card_menu}>
        <Button
          label="Criar Tarefa"
          severity="success"
          icon="pi pi-plus"
          className="p-1"
          disabled={permission}
          onClick={() => {
            setChildren(<CreateTask setVisible={() => setVisible(false)} />)
            setTitle("Tarefas")
            setVisible(true)
          }}
        />
        <Button
          label="Editar Usuário"
          severity="info"
          icon="pi pi-user"
          className="p-1"
          disabled={permission}
          onClick={() => {
            setVisible(true)
            setChildren(<div>Usuário</div>)
            setTitle("Usuário")
            setVisible(true)
          }}
        />
        <Button
          label="Perfil"
          severity="warning"
          icon="pi pi-pencil"
          className="p-1"
          disabled={permission}
          onClick={() => {
            setVisible(true)
            setChildren(<div>Perfil</div>)
            setTitle("Perfil")
            setVisible(true)
          }}
        />
      </div>

      <Modal visible={visible} setVisible={setVisible} title={title} children={children} />
    </div>
  )
}
