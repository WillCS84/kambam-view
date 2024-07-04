"use client"

import style from "../kanban.module.css"
import { IoHomeOutline } from "react-icons/io5"
import { Button } from "primereact/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Modal from "./modal"
import CreateTask, { createTaskFormSchema } from "./createTask"
import { getItems } from "@/components/Utils"
import Link from "next/link"
import { SplitButton } from "primereact/splitbutton"
import Confirmation from "@/components/modal/confirmation"
import { IUser, removeUser } from "@/api/userApi"
import { showError, showSuccess } from "@/components/Toast"
import { useRouter } from "next/navigation"

interface TaskProps {
  setTasks: Dispatch<SetStateAction<createTaskFormSchema[]>>
}

export default function MenuKanban({ setTasks }: TaskProps) {
  const router = useRouter()

  const [user, setUser] = useState<IUser>()
  const [permission, setPermission] = useState(false)
  const [children, setChildren] = useState<React.ReactNode>()
  const [title, setTitle] = useState("")
  const [visible, setVisible] = useState(false)
  const [modal, setModal] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)

  useEffect(() => {
    const userStorage = getItems("user")

    if (userStorage) {
      setUser(userStorage)
    }
  }, [])

  const items = [
    {
      label: "Editar",
      icon: "pi pi-refresh",
      command: () => {
        setChildren(<div>Usuário</div>)
        setTitle("Usuário")
        setVisible(true)
      }
    },
    {
      label: " Excluir Conta e Sair",
      icon: "pi pi-trash",
      command: () => setVisibleModal(true)
    }
  ]

  const changeConfirmModal = async (event: boolean) => {
    if (event && user) {
      await removeUser(user).then((res) => {
        if (res.error) {
          showError(res.message)
        } else {
          showSuccess(res.message)
          router.push("/")
        }
      })
    }
  }

  return (
    <div className={style.menu}>
      <div className={style.menu_header}>
        <Link className={style.link} href="/">
          <div className="flex align-items-center gap-2">
            <IoHomeOutline size={25} />
            Sair
          </div>
        </Link>

        <SplitButton
          dropdownIcon={
            <div className={style.menu_user}>
              <i className="pi pi-user"></i>
              <strong className="ml-1">{user?.name}</strong>
            </div>
          }
          size="large"
          model={items}
          text
          outlined
        />
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
      <Confirmation
        title={"Deseja excluir sua conta e sair?"}
        visible={visibleModal}
        setVisible={setVisibleModal}
        setConfirm={(e) => changeConfirmModal(e)}
      />
    </div>
  )
}
