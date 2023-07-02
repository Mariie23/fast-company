import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import api from "../../../api"
import { useParams } from "react-router-dom"
import SelectField from "../form/selectField"
import { validator } from "../../../utils/validator"
import TextAreaField from "../form/textAreaFiels"

const NewCommentsForm = ({ onSubmit }) => {
  const [users, setUsers] = useState()
  const { userId } = useParams()
  const [data, setData] = useState({ userId: "", content: "" })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ ...data, pageId: userId })
    console.log("Ok")
    setData((prevState) => ({ ...prevState, userId: "", content: "" }))
  }
  useEffect(() => {
    validate()
  }, [data])
  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберите от чьего имени вы хотите отправить сообщение",
      },
    },
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым",
      },
    },
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  return (
    <form onSubmit={handleSubmit}>
      {users && (
        <SelectField
          label="Выберите пользователя"
          name="userId"
          options={users}
          value={data.userId}
          onChange={handleChange}
          error={errors.userId}
        />
      )}
      <TextAreaField
        name="content"
        placeholder="Оставьте здесь комментарий"
        value={data.content}
        error={errors.content}
        onChange={handleChange}
      />
      <button className="btn btn-primary">Добавить</button>
    </form>
  )
}
NewCommentsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default NewCommentsForm
