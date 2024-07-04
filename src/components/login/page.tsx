"use client"
import React from "react"
import style from "./page.module.css"
import { Button } from "primereact/button"
import Link from "next/link"
import { IResponse, authLogin } from "@/api"
import { useRouter } from "next/navigation"
import Image from "next/image"
import myKanban from "../../../public/19962.jpg"
import { showSuccess } from "@/components/Toast"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginUserFormSchema = z.object({
  email: z.string().nonempty("O e-mail é obrigatório!").email("Formato de e-mail inválido!").toLowerCase(),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!")
})

type LoginUserFormData = z.infer<typeof loginUserFormSchema>

export default function Login() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema)
  })

  async function loginUser(data: LoginUserFormData) {
    await authLogin(data).then((response: IResponse) => {
      if (!response.error) {
        router.push("/kanban")
        showSuccess(response.message)
        localStorage.setItem("user", JSON.stringify(response.response))
      }
    })
  }

  return (
    <div>
      <div className={style.header}>
        <h1>Meu Kanban</h1>
      </div>
      <div className={style.cardBody}>
        <Image src={myKanban} width={800} height={500} alt="Pessoas trabalhando no quadro kanban" />
      </div>

      <div className={style.menu}>
        <form onSubmit={handleSubmit(loginUser)}>
          <div className={style.form}>
            <label htmlFor="email">E-mail</label>
            <input type="email" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className={style.form}>
            <label htmlFor="password">Senha</label>
            <input type="password" {...register("password")} />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <Button className={style.button} type="submit" label="Login" />
        </form>
        <div className="flex justify-content-between" onClick={() => {}}>
          <Link href={"/register"}>Criar Conta?</Link>
        </div>
      </div>
    </div>
  )
}
