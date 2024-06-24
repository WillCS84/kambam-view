"use client"
import style from "./kanban.module.css"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Tooltip } from "primereact/tooltip"
import { IoHomeOutline } from "react-icons/io5"
import Link from "next/link"
import { useEffect, useState } from "react"
import Task from "./task"
import { saveTaskMongo } from "@/api/taskApi"

interface ITask {
  title: string
  description: string
  situation: string
  id_task: string
}

interface IUser {
  name: string
  id_profile: number
}

interface IProfile {
  id_profile: number
  role: string
  description: string
}

export const taskCard = () => {
  return [
    { id_task: 1, title: "To Do", description: "descrição da tarefa", situation: "1" },
    { id_task: 2, title: "Pendende", description: "descrição da tarefa", situation: "2" },
    { id_task: 3, title: "To Do", description: "descrição da tarefa", situation: "1" },
    { id_task: 4, title: "To Do", description: "descrição da tarefa", situation: "1" },
    { id_task: 5, title: "Pendente", description: "descrição da tarefa", situation: "2" },
    { id_task: 6, title: "Pendente", description: "descrição da tarefa", situation: "2" },
    { id_task: 7, title: "To Do", description: "descrição da tarefa", situation: "1" },
    { id_task: 8, title: "concluido", description: "descrição da tarefa", situation: "3" },
    { id_task: 9, title: "concluido", description: "descrição da tarefa", situation: "3" }
  ]
}

export default function kanban() {
  const [user, setUser] = useState<IUser>()
  const [profiles, setProfiles] = useState<IProfile[]>([])
  const [permission, setPermission] = useState(false)
  const [tarefas, setTarefas] = useState(taskCard())

  const [visible, setVisible] = useState(false)
  function getItems(name: string) {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem(name)
      if (storedItems !== null) {
        try {
          const item = JSON.parse(storedItems)
          return item
        } catch (error) {
          console.error(error)
        }
      }
    }
    return []
  }

  useEffect(() => {
    const userStorage = getItems("user")
    setUser(userStorage)
    const profileStorage = getItems("profile")
    setProfiles(profileStorage)
    if (profileStorage.length > 0) {
      setPermission(
        profileStorage.some(
          (profile: IProfile) => profile.id_profile === userStorage?.id_profile && profile.role === "1"
        )
      )
    }
  }, [])

  const footer = (title: string, task: any, isButton = true) => {
    if (profiles.some((profile: IProfile) => profile.id_profile === user?.id_profile && profile.role !== "3"))
      return (
        <div className="flex justify-content-between">
          <Tooltip target="seguir" mouseTrack mouseTrackLeft={10} className="p-1" />
          <Button
            tooltip={title}
            severity="success"
            size="small"
            outlined
            icon="pi pi-angle-double-right"
            rounded
            tooltipOptions={{ position: "top", mouseTrack: true, mouseTrackTop: 15 }}
            onClick={() => onSituationNextLevel(task, title === "Arquivar" ? true : false)}
            style={{ marginLeft: "0.5em", marginRight: "0.5rem", border: "none" }}
          />
          {isButton && (
            <Button
              tooltip="Voltar etapa"
              severity="info"
              size="small"
              icon="pi pi-angle-double-left"
              outlined
              rounded
              tooltipOptions={{ position: "top", mouseTrack: true, mouseTrackTop: 15 }}
              onClick={() => onEditSituation(task)}
              style={{ marginLeft: "0.5em", marginRight: "0.5rem", border: "none" }}
            />
          )}
          <Button
            tooltip="Excluir"
            severity="danger"
            icon="pi pi-times"
            rounded
            outlined
            size="small"
            className="p-2"
            tooltipOptions={{ position: "top", mouseTrack: true, mouseTrackTop: 15 }}
            onClick={() => onRemoveTask(task)}
            style={{ marginLeft: "0.5em", marginRight: "0.5rem", border: "none" }}
          />
        </div>
      )
  }

  const arquivarMongo = async (task: any) => {
    await saveTaskMongo(task)
      .then((data) => {
        console.log("task create mongo", data)
      })
      .catch((err) => console.log("error", err))
  }

  const onSituationNextLevel = (task: any, arquivar: boolean) => {
    if (arquivar) {
      arquivarMongo(task)
    }
    const newTarefas = tarefas.map((tarefa) => {
      if (tarefa.id_task === task.id_task) {
        switch (tarefa.situation) {
          case "1":
            tarefa.situation = "2"
            break
          case "2":
            tarefa.situation = "3"
            break
          case "3":
            tarefa.situation = "4"
            break
        }
      }
      return tarefa
    })
    setTarefas(newTarefas)
  }

  const onEditSituation = (task: any) => {
    const newTarefas = tarefas.map((tarefa) => {
      if (tarefa.id_task === task.id_task) {
        switch (tarefa.situation) {
          case "2":
            tarefa.situation = "1"
            break
          case "3":
            tarefa.situation = "2"
            break
        }
      }
      return tarefa
    })
    setTarefas(newTarefas)
  }

  const onRemoveTask = async (task: any) => {
    const newTarefas = tarefas.filter((tarefa) => tarefa.id_task !== task.id_task)

    setTarefas(newTarefas)
  }

  return (
    <div>
      <div className={style.divHeader}>
        <div className="flex justify-content-between">
          <div>
            <Link className={style.link} href="/">
              <IoHomeOutline size={25} />
              <span className="px-1 mx-1">
                <strong>{user?.name}</strong>
              </span>
            </Link>
          </div>
          <div>
            <Button
              label="Criar Tarefa"
              severity="success"
              icon="pi pi-check"
              className="p-1"
              disabled={!permission}
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
      </div>
      <div className={style.header}>
        <div>
          <h2>Pendente</h2>
        </div>
        <div>
          <h2>Andamento</h2>
        </div>
        <div>
          <h2>Concluido</h2>
        </div>
      </div>

      <div className={style.cardBody}>
        <div className={style.cardGrid}>
          {tarefas.map((task: any) => {
            if (task.situation === "1")
              return (
                <Card title={task.title} footer={footer("Próxima Etapa", task, false)} className="md:w-25rem p-1 mt-1">
                  <span className="m-0 p-1">{task.description}</span>
                </Card>
              )
          })}
        </div>
        <div className={style.cardGrid}>
          {tarefas.map((task: any) => {
            if (task.situation === "2")
              return (
                <Card title={task.title} footer={footer("voltar Etapa", task)} className="md:w-30rem p-1 mt-1">
                  <span className="m-0 p-1">{task.description}</span>
                </Card>
              )
          })}
        </div>
        <div className={style.cardGrid}>
          {tarefas.map((task: any) => {
            if (task.situation === "3")
              return (
                <Card title={task.title} footer={footer("Arquivar", task)} className="md:w-25rem p-1 mt-1">
                  <span className="m-0 p-1 text">{task.description}</span>
                </Card>
              )
          })}
        </div>
      </div>

      <Task visible={visible} setVisible={setVisible} />
    </div>
  )
}
