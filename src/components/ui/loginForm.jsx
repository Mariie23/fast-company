import React, { useState, useEffect } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"
const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayIn: false })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Поле обязательно для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Поле обязательно для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать цифру",
      },
      min: {
        message: "Длина пароля не менее 8 символов",
        value: 8,
      },
    },
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (isValid) console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Войти</h1>
      <TextField
        label="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField name="stayIn" value={data.stayIn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Войти
      </button>
    </form>
  )
}

export default LoginForm
