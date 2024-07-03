"use client"

import React, { useState } from "react"
import style from "./register.module.css"
import { useRouter } from "next/navigation"
import HomeReturn from "@/components/HomeReturn"
import Profile from "./profile"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "primereact/button"
import { saveUser } from "@/api/userApi"
import { showError, showSuccess } from "@/components/Toast"

const userFormSchema = z.object({
  name: z.string().nonempty("A Nome é obrigatório!"),
  email: z.string().nonempty("O e-mail é obrigatório!").email("Formato de e-mail inválido!").toLowerCase(),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!")
})

type CreateUserFormSchema = z.infer<typeof userFormSchema>

export default function Register() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserFormSchema>({
    resolver: zodResolver(userFormSchema)
  })

  const submitUserForm = async (data: CreateUserFormSchema) => {
    await saveUser(data).then((res) => {
      if (res.error) {
        if (res.message?.name) {
          showError(res.message.name)
        }
        showError(res.message)
      } else {
        localStorage.setItem("user", JSON.stringify(res.response))
        router.push("/kanban")
        showSuccess(res.message)
      }
    })
  }

  return (
    <div>
      <HomeReturn />
      <div className={style.main}>
        <h3>Cadastro</h3>

        <div className={style.card}>
          <form onSubmit={handleSubmit(submitUserForm)}>
            <div className={style.form}>
              <label className="text-primary" htmlFor="name">
                Nome
              </label>
              <input type="text" {...register("name")} placeholder="..." />

              {errors.name && <span className={style.error}>{errors.name.message}</span>}
            </div>
            <div className={style.form}>
              <label className="text-primary" htmlFor="email">
                E-mail
              </label>
              <input type="email" {...register("email")} placeholder="..." />

              {errors.email && <span className={style.error}>{errors.email.message}</span>}
            </div>
            <div className={style.form}>
              <label className="text-primary" htmlFor="password">
                Senha
              </label>
              <input type="password" {...register("password")} placeholder="..." />

              {errors.password && <span className={style.error}>{errors.password.message}</span>}
            </div>
            {/* <div className={style.form}>
              <label className="text-primary" htmlFor="profile">
                Perfil
              </label>

              <Dropdown
                value={profile}
                onChange={(e) => setProfile(e.value)}
                options={profiles}
                optionLabel="description"
                placeholder="..."
                className="w-full md:w-full p-2 text-primary"
                style={{ borderRadius: "8px", border: "1px solid black" }}
              />

              {errors.profile && <span className={style.error}>{errors.profile.message}</span>}
            </div> */}
            <div className={style.div_button}>
              <Button className={style.button} type="submit" label="Salvar" />
            </div>
          </form>
        </div>
      </div>
      <Profile visible={visible} setVisible={setVisible} />
    </div>
  )
}
