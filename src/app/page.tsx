"use client"
import React, { useEffect } from "react"
import { Formik } from "formik"
import style from "./page.module.css"
import { Button } from "primereact/button"
import Link from "next/link"
import { classNames } from "primereact/utils"
import { IResponse, authLogin } from "@/api"
import { useRouter } from "next/navigation"
import Image from "next/image"
import myKanban from ".././../public/19962.jpg"
import { showSuccess } from "@/components/Toast"

interface FormProps {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()

  const validateForms = (data: FormProps) => {
    let errors = {
      email: "",
      password: ""
    }

    if (!data.email) {
      errors.email = "Email é necessário."
    }

    if (!data.password) {
      errors.password = "Senha é necessário."
    }

    return errors
  }

  const submitForms = async (data: FormProps) => {
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
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => validateForms(values)}
          onSubmit={() => {}}
        >
          {({ values, handleSubmit, errors, touched, isSubmitting, handleChange, handleBlur }) => (
            <form className={style.form} onSubmit={handleSubmit}>
              {errors.email && touched.email && errors.email}
              <div>
                <label htmlFor="email" className={classNames({ "p-error": errors.email })}>
                  Email
                </label>
                <input
                  type="email"
                  id="name"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <label htmlFor="password" className={classNames({ "p-error": errors.password })}>
                Senha
              </label>
              <input id="password" type="password" name="password" value={values.password} onChange={handleChange} />
              {errors.password && touched.password && errors.password}

              <Button
                className={style.button}
                type="submit"
                label="Login"
                disabled={isSubmitting}
                onClick={() => submitForms(values)}
              />
            </form>
          )}
        </Formik>
        <div className="flex justify-content-between">
          <Link href="/register">Criar Conta?</Link>
        </div>
      </div>
    </div>
  )
}

