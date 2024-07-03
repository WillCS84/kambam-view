"use client"
import { useEffect, useState } from "react"
import style from "../kanban.module.css"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Tooltip } from "primereact/tooltip"
import { getTasks } from "@/api/taskApi"
import { showError } from "@/components/Toast"

interface IProfile {
  id_profile: number
  role: string
  description: string
}

interface IUser {
  name: string
  id_profile: number
}

export default function CardTask() {
  const [tarefas, setTarefas] = useState([])
  const [profiles, setProfiles] = useState<IProfile[]>([])
  const [user, setUser] = useState<IUser>()

  const fetchTasks = async () => {
    return await getTasks()
  }

  useEffect(() => {
    fetchTasks().then((res) => {
      if (res.data.error) {
        return showError(res.data.message)
      }
      setTarefas(res.data.tasks)
    })
  }, [])

  // const onSituationNextLevel = (task: any, arquivar: boolean) => {
  //   const newTarefas = tarefas.map((tarefa) => {
  //     if (tarefa.id_task === task.id_task) {
  //       switch (tarefa.status) {
  //         case 1:
  //           tarefa.status = 2
  //           break
  //         case 2:
  //           tarefa.status = 3
  //           break
  //         case 3:
  //           tarefa.status = 4
  //           break
  //       }
  //     }
  //     return tarefa
  //   })
  //   setTarefas(newTarefas)
  // }

  // const onEditSituation = (task: any) => {
  //   const newTarefas = tarefas.map((tarefa) => {
  //     if (tarefa.id_task === task.id_task) {
  //       switch (tarefa.status) {
  //         case 2:
  //           tarefa.status = 1
  //           break
  //         case 3:
  //           tarefa.status = 2
  //           break
  //       }
  //     }
  //     return tarefa
  //   })
  //   setTarefas(newTarefas)
  // }

  // const onRemoveTask = async (task: any) => {
  //   const newTarefas = tarefas.filter((tarefa) => tarefa.id_task !== task.id_task)

  //   setTarefas(newTarefas)
  // }

  const footer = (title: string, task: any, isButton = true) => {
    // if (profiles.some((profile: IProfile) => profile.id_profile === user?.id_profile && profile.role !== "3"))
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
          onClick={() => {}}
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
            onClick={() => {}}
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
          onClick={() => {}}
          style={{ marginLeft: "0.5em", marginRight: "0.5rem", border: "none" }}
        />
      </div>
    )
  }

  return (
    <div className={style.cardBody}>
      <div className={style.cardGrid}>
        {tarefas.map((task: any) => {
          if (task.status === 1)
            return (
              <Card title={task.title} footer={footer("Próxima Etapa", task, false)} className="md:w-25rem p-1 mt-1">
                <span className="m-0 p-1">{task.description}</span>
              </Card>
            )
        })}
      </div>
      <div className={style.cardGrid}>
        {tarefas.map((task: any) => {
          if (task.status === 2)
            return (
              <Card title={task.title} footer={footer("voltar Etapa", task)} className="md:w-30rem p-1 mt-1">
                <span className="m-0 p-1">{task.description}</span>
              </Card>
            )
        })}
      </div>
      <div className={style.cardGrid}>
        {tarefas.map((task: any) => {
          if (task.status === 3)
            return (
              <Card title={task.title} footer={footer("Arquivar", task)} className="md:w-25rem p-1 mt-1">
                <span className="m-0 p-1 text">{task.description}</span>
              </Card>
            )
        })}
      </div>
    </div>
  )
}
