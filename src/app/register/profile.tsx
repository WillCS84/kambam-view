"use client"
import { Dialog } from "primereact/dialog"
import style from "./register.module.css"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "primereact/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { saveProfile } from "@/api/profile"

const profileFormSchema = z.object({
  description: z.string().nonempty("A Descrição é obrigatório!"),
  role: z.string()
})

type CreateProfileFormSchema = z.infer<typeof profileFormSchema>

export default function Profile({ visible, setVisible }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateProfileFormSchema>({
    resolver: zodResolver(profileFormSchema)
  })

  const submitProfile = async (data: CreateProfileFormSchema) => {
    await saveProfile(data).then((res: any) => {
      localStorage.setItem("profile", JSON.stringify(res.profile))
    })
    setVisible(false)
  }

  const roles = [
    { roleId: "1", name: "Administrador (Todas as permissões)" },
    { roleId: "2", name: "Usuário (pode alterar situação da tarefa)" },
    { roleId: "3", name: "Somente Leitura (observar o quadro)" }
  ]

  return (
    <Dialog
      header={
        <div className="flex justify-content-center">
          <span className="mt-1 p-1">Cadastro de Perfil</span>
        </div>
      }
      visible={visible}
      modal
      onHide={() => {
        setVisible(false)
      }}
      style={{
        width: "40rem",
        height: "30rem"
      }}
    >
      <div className={style.menu}>
        <form onSubmit={handleSubmit(submitProfile)}>
          <div className={style.form}>
            <label className="text-primary" htmlFor="descricao">
              Descrição
            </label>
            <input type="text" {...register("description")} placeholder="..." />

            {errors.description && <span className={style.error}>{errors.description.message}</span>}
          </div>
          <div className={style.form}>
            {roles.map((role, index) => {
              return (
                <div key={index}>
                  <input
                    style={{ width: "18px", marginInline: "1rem" }}
                    type="radio"
                    value={role.roleId}
                    {...register("role")}
                  />
                  <label className="text-primary" htmlFor="permissao">
                    {role.name}
                  </label>
                </div>
              )
            })}
          </div>
          <div className={style.div_button}>
            <Button className={style.button} type="submit" label="Salvar" />
          </div>
        </form>
      </div>
    </Dialog>
  )
}
