"use client"
import style from "./kanban.module.css"
import MenuKanban from "./components/menu"
import CardTask from "./components/cardTask"
import { StatusTask } from "@/components/Utils/enum"
import { useEffect, useState } from "react"
import { getTasks } from "@/api/taskApi"
import { createTaskFormSchema } from "./components/createTask"

export default function kanban() {
  const [tarefas, setTarefas] = useState<createTaskFormSchema[]>([])

  const fetchTasks = async () => {
    return await getTasks()
  }

  useEffect(() => {
    fetchTasks().then((res) => {
      if (!res.data.error) {
        setTarefas(res.data.tasks)
      }
    })
  }, [])

  return (
    <div>
      <MenuKanban setTasks={setTarefas} />

      <div className={style.header}>
        <div>
          <h2>{StatusTask.description(StatusTask.Pendente)}</h2>
        </div>
        <div>
          <h2>{StatusTask.description(StatusTask.Andamento)}</h2>
        </div>
        <div>
          <h2>{StatusTask.description(StatusTask.Concluido)}</h2>
        </div>
      </div>

      <CardTask tasks={tarefas} setTasks={setTarefas} fetchTasks={fetchTasks} />
    </div>
  )
}
