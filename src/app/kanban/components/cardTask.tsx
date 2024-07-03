"use client"
import { Dispatch, SetStateAction } from "react"
import style from "../kanban.module.css"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Tooltip } from "primereact/tooltip"
import { deleteTask, getTasks, updateTask } from "@/api/taskApi"
import { showError } from "@/components/Toast"
import { StatusTask } from "@/components/Utils/enum"
import { createTaskFormSchema } from "./createTask"
import { AxiosResponse } from "axios"

interface IProfile {
  id_profile: number
  role: string
  description: string
}

interface IUser {
  name: string
  id_profile: number
}

interface TaskProps {
  tasks: createTaskFormSchema[]
  setTasks: Dispatch<SetStateAction<createTaskFormSchema[]>>
  fetchTasks: () => Promise<AxiosResponse>
}

export default function CardTask({ tasks, setTasks, fetchTasks }: TaskProps) {
  const changePrevoiusStatusTask = async (task: any) => {
    task.status -= 1
    await updateTask(task)
    fetchTasks().then((res: any) => {
      if (res.data.error) {
        return showError(res.data.message)
      }
      setTasks(res.data.tasks)
    })
  }

  const changeNextStatusTask = async (task: any) => {
    task.status += 1
    await updateTask(task)
    fetchTasks().then((res: any) => {
      if (res.data.error) {
        return showError(res.data.message)
      }
      setTasks(res.data.tasks)
    })
  }

  const RemoveTask = async (id_task: number) => {
    await deleteTask(id_task)
    fetchTasks().then((res: any) => {
      if (res.data.error) {
        return showError(res.data.message)
      }
      setTasks(res.data.tasks)
    })
  }

  const footer = (title: string, task: any, isButton = true) => {
    // if (profiles.some((profile: IProfile) => profile.id_profile === user?.id_profile && profile.role !== "3"))
    return (
      <div className="flex justify-content-between align-items-center p-1">
        <Tooltip target="seguir" mouseTrack mouseTrackLeft={10} />

        <Button
          tooltip={title}
          severity="success"
          className="p-1 m-1"
          outlined
          rounded
          tooltipOptions={{ position: "top", mouseTrack: true, mouseTrackTop: 15 }}
          onClick={() => changeNextStatusTask(task)}
        >
          <i className="pi pi-angle-double-right"></i>
        </Button>

        {isButton && (
          <Button
            tooltip="Retornar etapa!"
            severity="info"
            outlined
            rounded
            className="p-1 m-1"
            tooltipOptions={{ position: "top", mouseTrack: true, mouseTrackTop: 15 }}
            onClick={() => changePrevoiusStatusTask(task)}
          >
            <i className="pi pi-angle-double-left"></i>
          </Button>
        )}
        <Button
          tooltip="Excluir"
          severity="danger"
          rounded
          outlined
          className="p-1 mx-2"
          tooltipOptions={{ position: "top", mouseTrack: true, mouseTrackTop: 15 }}
          onClick={() => RemoveTask(task.id_task)}
        >
          <i className="pi pi-times"></i>
        </Button>
      </div>
    )
  }

  return (
    <div className={style.cardBody}>
      <div className={style.cardGrid}>
        {tasks.map((task: any) => {
          if (task.status === StatusTask.Pendente)
            return (
              <div key={task.id_task}>
                <Card
                  style={{
                    background: "#FFC4D6",
                    height: "10rem",
                    width: "28rem",
                    marginBottom: "1rem",
                    borderRadius: "18px"
                  }}
                >
                  <div className={style.card_task}>
                    <h2>{task.title}</h2>
                    <span>{task.description}</span>
                    {footer("Próxima Etapa", task)}
                  </div>
                </Card>
              </div>
            )
        })}
      </div>
      <div className={style.cardGrid}>
        {tasks.map((task: any) => {
          if (task.status === StatusTask.Andamento)
            return (
              <div key={task.id_task}>
                <Card
                  style={{
                    background: "#CBF3F0",
                    height: "10rem",
                    width: "28rem",
                    marginBottom: "1rem",
                    borderRadius: "18px"
                  }}
                >
                  <div className={style.card_task}>
                    <h2>{task.title}</h2>
                    <span>{task.description}</span>
                    {footer("Próxima Etapa", task)}
                  </div>
                </Card>
              </div>
            )
        })}
      </div>
      <div className={style.cardGrid}>
        {tasks.map((task: any) => {
          if (task.status === StatusTask.Concluido)
            return (
              <div key={task.id_task}>
                <Card
                  style={{
                    background: "#95D5B2",
                    height: "10rem",
                    width: "28rem",
                    marginBottom: "1rem",
                    borderRadius: "18px"
                  }}
                >
                  <div className={style.card_task}>
                    <h2>{task.title}</h2>
                    <span>{task.description}</span>
                    {footer("", task)}
                  </div>
                </Card>
              </div>
            )
        })}
      </div>
    </div>
  )
}
