"use client"
import Link from "next/link"
import style from "./register.module.css"
import { IoHomeOutline } from "react-icons/io5"
import { useFormik } from "formik"
import { classNames } from "primereact/utils"
import styleMain from "../page.module.css"
import { Dropdown } from "primereact/dropdown"
import { Button } from "primereact/button"
import { saveUser, saveUserMongo } from "@/api/userApi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { showSuccess } from "@/components/Toast"

export default function Register() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profile: {
        code: "",
        name: ""
      }
    },
    validate: (data) => {
      let errors = {
        name: "",
        email: "",
        password: "",
        profile: "",
        isValidate: false
      }

      if (!data.name) {
        errors.name = "Nome é Obrigatório!"
        errors.isValidate = true
      }

      if (!data.email) {
        errors.email = "Email é obrigatório!"
        errors.isValidate = true
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = "Email inválido!"
        errors.isValidate = true
      }

      if (!data.password) {
        errors.password = "Senha é obrigatório!"
        errors.isValidate = true
      }

      if (!data.profile) {
        errors.profile = "Selecione um perfil!"
        errors.isValidate = true
      }

      if (errors.isValidate) {
        return errors
      }
    },

    onSubmit: async (values) => {
      await saveUser(values).then((res: any) => {
        if (!res.error) {
          router.push("/kanban")
          showSuccess(res.message)
          localStorage.setItem("user", JSON.stringify(res.response.user))
          localStorage.setItem("profile", JSON.stringify(res.response.profiles))
        }
      })
      // await saveUserMongo(values)
      //   .then((data) => {
      //     console.log("data", data)
      //   })
      //   .catch((err) => console.log("error", err))
    }
  })

  const profileOptions = [
    { name: "Administrador", code: "1" },
    { name: "Usuário", code: "2" },
    { name: "Visitante", code: "3" }
  ]

  const isFormFieldValid = (touched: any, errors: any, key: string) => touched[key] && errors[key]
  const getFormErrorMessage = (touched: any, errors: any, key: any) => {
    return isFormFieldValid(touched, errors, key) && <small className="p-error">{errors[key]}</small>
  }

  return (
    <div>
      <div className={style.divHeader}>
        <Link className={style.link} href="/">
          <IoHomeOutline size={25} />
        </Link>
      </div>

      <div className={style.main}>
        <h3>Cadastro</h3>
        <div className={style.card}>
          <form className={style.form} onSubmit={formik.handleSubmit}>
            {getFormErrorMessage(formik.touched, formik.errors, "name")}
            <div>
              <label htmlFor="name" className={classNames({ "p-error": formik.errors.name })}>
                Nome
              </label>
              <input
                type="name"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {getFormErrorMessage(formik.touched, formik.errors, "email")}
            <div>
              <label htmlFor="email" className={classNames({ "p-error": formik.errors.email })}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {getFormErrorMessage(formik.touched, formik.errors, "password")}
            <div>
              <label htmlFor="password" className={classNames({ "p-error": formik.errors.password })}>
                Senha
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            {getFormErrorMessage(formik.touched, formik.errors, "profile")}
            <div className="flex flex-column">
              <label htmlFor="id_profile" className={classNames({ "p-error": formik.errors.profile }, "mb-1")}>
                Perfil
              </label>
              <Dropdown
                id="profile"
                name="profile"
                value={formik.values.profile}
                onChange={formik.handleChange}
                options={profileOptions}
                optionLabel="name"
                placeholder="Selecione"
                style={{ padding: "0.5rem", border: "1px solid black" }}
              />
            </div>
            <Button className={styleMain.button} type="submit" label="Cadastrar" />
          </form>
        </div>
      </div>
    </div>
  )
}
