"use client"
import Link from "next/link"
import style from "../kanban.module.css"
import { IoHomeOutline } from "react-icons/io5"
import { Button } from "primereact/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Modal from "./modal"
import CreateTask, { createTaskFormSchema } from "./createTask"
import { AxiosResponse } from "axios"
import { getItems } from "@/components/Utils"

interface IUser {
  name: string
  id_profile: number
}

interface TaskProps {
  setTasks: Dispatch<SetStateAction<createTaskFormSchema[]>>
}

export default function MenuKanban({ setTasks }: TaskProps) {
  const [user, setUser] = useState<IUser>()
  const [permission, setPermission] = useState(false)
  const [children, setChildren] = useState<React.ReactNode>()
  const [title, setTitle] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const userStorage = getItems("user")

    if (userStorage) {
      setUser(userStorage)
    }
  }, [])

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
          style={{ padding: "1rem", borderRadius: "18px" }}
          icon="pi pi-plus"
          disabled={permission}
          onClick={() => {
            setChildren(<CreateTask setVisible={() => setVisible(false)} setTasks={setTasks} />)
            setTitle("Tarefas")
            setVisible(true)
          }}
        />
        <Button
          label="Editar Usuário"
          icon="pi pi-user"
          severity="info"
          style={{ padding: "1rem", borderRadius: "18px" }}
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
          style={{ padding: "1rem", borderRadius: "18px" }}
          icon="pi pi-pencil"
          severity="help"
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
