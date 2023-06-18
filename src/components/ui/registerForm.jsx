import React, { useState, useEffect } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import api from "../../api"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckBoxField from "../common/form/checkBoxField"
const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: {},
    licence: false,
  })
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState()
  const [errors, setErrors] = useState({})
  useEffect(() => {
    validate()
  }, [data])
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])
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
    profession: {
      isRequired: {
        message: "Небходимо выбрать профессию",
      },
    },
    licence: {
      isRequired: {
        message: "Необходимо принять лицензионное соглашение",
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
      <h1>Регистрация</h1>
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
      {professions && (
        <SelectField
          label="Профессия"
          name="profession"
          value={data.profession}
          options={professions}
          onChange={handleChange}
          error={errors.profession}
        />
      )}
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        label="Выберите пол"
        value={data.sex}
        name="sex"
        onChange={handleChange}
      />
      {qualities && (
        <MultiSelectField
          options={qualities}
          name="qualities"
          onChange={handleChange}
          label="Выберите качества"
        />
      )}
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        Принять <a>лиценционное соглашение</a>
      </CheckBoxField>
      <button className="btn btn-primary w-100" disabled={!isValid}>
        Войти
      </button>
    </form>
  )
}

export default RegisterForm
