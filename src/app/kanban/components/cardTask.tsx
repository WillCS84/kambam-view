"use client"
import { Dispatch, SetStateAction, useState } from "react"
import style from "../kanban.module.css"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Tooltip } from "primereact/tooltip"
import { deleteTask, updateTask } from "@/api/taskApi"
import { showError } from "@/components/Toast"
import { StatusTask } from "@/components/Utils/enum"
import CreateTask, { createTaskFormSchema } from "./createTask"
import { AxiosResponse } from "axios"
import Confirmation from "@/components/modal/confirmation"
import Modal from "./modal"

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
  const [visibleModal, setVisibleModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const [idTaskRemove, setIdTaskRemove] = useState(0)
  const [children, setChildren] = useState<React.ReactNode>()
  const [title, setTitle] = useState("")

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

  const changeConfirmModal = async (event: boolean) => {
    if (event && idTaskRemove !== 0) {
      RemoveTask(idTaskRemove)
    }
  }

  const footer = (title: string, returnTitle: string, task: any, isButton = true) => {
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
            tooltip={returnTitle}
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
          onClick={() => {
            setIdTaskRemove(task.id_task)
            setVisibleModal(true)
          }}
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
                    <div className="flex justify-content-between">
                      <h2>{task.title}</h2>
                      <Button
                        className="mx-1"
                        label="editar"
                        iconPos="right"
                        outlined
                        style={{ border: "none" }}
                        onClick={() => {
                          setChildren(
                            <CreateTask setVisible={() => setVisible(false)} setTasks={setTasks} task={task} />
                          )
                          setTitle("Tarefa")
                          setVisible(true)
                        }}
                      ></Button>
                    </div>
                    <span>{task.description}</span>
                    {footer("Por Em Andamento", "", task, false)}
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
                    <div className="flex justify-content-between">
                      <h2>{task.title}</h2>
                      <Button
                        className="mx-1"
                        label="editar"
                        iconPos="right"
                        outlined
                        style={{ border: "none" }}
                        onClick={() => {
                          setChildren(
                            <CreateTask setVisible={() => setVisible(false)} setTasks={setTasks} task={task} />
                          )
                          setTitle("Tarefa")
                          setVisible(true)
                        }}
                      ></Button>
                    </div>
                    <span>{task.description}</span>
                    {footer("Por em Concluído", "Retornar para Pendente", task)}
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
                    <div className="flex justify-content-between">
                      <h2>{task.title}</h2>
                      <Button
                        className="mx-1"
                        label="editar"
                        iconPos="right"
                        outlined
                        style={{ border: "none" }}
                        onClick={() => {
                          setChildren(
                            <CreateTask setVisible={() => setVisible(false)} setTasks={setTasks} task={task} />
                          )
                          setTitle("Tarefa")
                          setVisible(true)
                        }}
                      ></Button>
                    </div>
                    <span>{task.description}</span>
                    {footer("Arquivar", "Retornar para Andamento", task)}
                  </div>
                </Card>
              </div>
            )
        })}
      </div>
      <Modal visible={visible} setVisible={setVisible} title={title} children={children} />
      <Confirmation
        title={"Deseja excluir a tarefa?"}
        visible={visibleModal}
        setVisible={setVisibleModal}
        setConfirm={(e) => changeConfirmModal(e)}
      />
    </div>
  )
}
