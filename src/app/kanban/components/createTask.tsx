"use client"
import { Dropdown } from "primereact/dropdown"
import { InputTextarea } from "primereact/inputtextarea"
import { useEffect, useState } from "react"
import style from "../../register/register.module.css"
import { Button } from "primereact/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getTasks, saveTask, updateTask } from "@/api/taskApi"
import { showError, showSuccess } from "@/components/Toast"

const statusOptions = [
  { name: "Pendente", value: 1 },
  { name: "Em Andamento", value: 2 },
  { name: "Concluído", value: 3 }
]

const taskFormSchema = z.object({
  id_task: z.number().optional(),
  title: z.string().nonempty("Título é obrigatório"),
  description: z.string().nonempty("descrição é obrigatório"),
  status: z.number()
})

export type createTaskFormSchema = z.infer<typeof taskFormSchema>

export default function CreateTask({ setVisible, setTasks, task = undefined }: any) {
  const [status, setStatus] = useState()

  const fetchTasks = async () => {
    return await getTasks()
  }

  useEffect(() => {
    console.log("effect", task)
    if (task) {
      setValue("title", task.title)
      setValue("description", task.description)
      setValue("status", task.status)
      setValue("id_task", task.id_task)
      setStatus(task.status)
    }
  }, [task])

  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors }
  } = useForm<createTaskFormSchema>({
    resolver: zodResolver(taskFormSchema)
  })

  const submitTask = async (task: createTaskFormSchema) => {
    console.log("SUBMIT", task)
    if (task?.id_task) {
      await updateTask(task).then((res: any) => {
        if (res.error) {
          return showError(res.message)
        }
        showSuccess("Tarefa alterada com sucesso!")
        reset()
        setVisible(false)
        fetchTasks().then((res) => {
          if (!res.data.error) {
            setTasks(res.data.tasks)
          }
        })
      })
    } else {
      await saveTask(task).then((res: any) => {
        if (res.error) {
          return showError(res.message)
        }
        showSuccess("Tarefa criada com sucesso!")
        reset()
        setVisible(false)
        fetchTasks().then((res) => {
          if (!res.data.error) {
            setTasks(res.data.tasks)
          }
        })
      })
    }
  }

  return (
    <div className={style.card}>
      <form onSubmit={handleSubmit(submitTask)}>
        <div className={style.form}>
          <label htmlFor="title">Título</label>
          <input type="text" {...register("title")} placeholder="..." />
          {errors.title && <span className={style.error}>{errors.title.message}</span>}
        </div>

        <div className={style.form}>
          <label htmlFor="description">Descrição</label>
          <InputTextarea rows={5} cols={30} {...register("description")} />
          {errors.description && <span className={style.error}>{errors.description.message}</span>}
        </div>

        <div className={style.form}>
          <label htmlFor="status">Status</label>
          <Dropdown
            value={status}
            onChange={(e) => {
              setStatus(e.value)
              setValue("status", e.value)
            }}
            options={statusOptions}
            optionLabel="name"
            placeholder="..."
            className="w-full md:w-full p-2 text-primary"
            style={{ borderRadius: "8px", border: "1px solid black" }}
          />
          {errors.status && <span className={style.error}>{errors.status.message}</span>}
        </div>

        <div className={style.button_task}>
          <Button
            className={style.button_clear}
            type="button"
            label="Limpar"
            outlined
            onClick={() => {
              setStatus(undefined)
              reset()
            }}
          />

          <Button className={style.button} type="submit" label="Salvar" />
        </div>
      </form>
    </div>
  )
}
