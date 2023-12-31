import React, { useState } from "react"
import { useParams } from "react-router-dom"
import LoginForm from "../components/ui/loginForm"
import RegisterForm from "../components/ui/registerForm"

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === "register" ? type : "login")
  const toggleFormType = () => {
    setFormType((prevState) => (prevState === "login" ? "register" : "login"))
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {formType === "login" ? (
            <>
              <LoginForm />
              <p>
                Нет аккаунта? <a onClick={toggleFormType}>Зарегистрироваться</a>
              </p>
            </>
          ) : (
            <>
              <RegisterForm />
              <p>
                Уже есть аккаунт?<a onClick={toggleFormType}>Войти</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
