import React, { useEffect, useState } from "react"
import api from "../../../api"
import { useHistory, useParams } from "react-router-dom"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import * as yup from "yup"

const EditUserPage = () => {
  const { userId } = useParams()
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  })
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [qualities, setQualities] = useState()
  const [professions, setProfessions] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const getQualities = (qualities) => {
    return qualities.map((qual) => ({ label: qual.name, value: qual._id }))
  }
  useEffect(() => {
    setIsLoading(true)
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        profession: profession._id,
        qualities: getQualities(qualities),
      })),
    )
    api.professions.fetchAll().then((data) => setProfessions(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])
  useEffect(() => {
    if (data._id) setIsLoading(false)
  }, [data])
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  useEffect(() => {
    validate()
  }, [data])
  const schema = yup.object({
    name: yup.string().required("Имя обязательно для заполнения"),
    email: yup
      .string()
      .required("Необходимо указать email")
      .email("Email указан некорректно"),
    profession: yup.string().required("Необходимо выбрать профессию"),
    sex: yup.string().required("Укажите пол"),
    qualities: yup.array().required("Выберите качества"),
  })
  const validate = () => {
    schema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }
  const getProfessionById = (id) => {
    return professions.find((profession) => profession._id === id)
  }
  const getArrayofSelectedQualities = () => {
    const qualitiesArr = Object.keys(qualities).map((qual) => qualities[qual])
    return data.qualities.map((qual) =>
      qualitiesArr.find((q) => q._id === qual.value),
    )
  }
  const isValid = Object.keys(errors).length === 0
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate) {
      api.users
        .update(userId, {
          ...data,
          qualities: getArrayofSelectedQualities(),
          profession: getProfessionById(data.profession),
        })
        .then((data) => history.push(`/users/${data._id}`))
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!isLoading && professions ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                error={errors.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={data.email}
                error={errors.email}
                onChange={handleChange}
              />
              <SelectField
                name="profession"
                label="Профессия"
                value={data.profession}
                options={professions}
                error={errors.profession}
                onChange={handleChange}
              />
              <RadioField
                label="Пол"
                name="sex"
                value={data.sex}
                error={errors.sex}
                options={[
                  { value: "male", name: "Мужской" },
                  { value: "female", name: "Женский" },
                  { value: "other", name: "Другой" },
                ]}
                onChange={handleChange}
              />
              <MultiSelectField
                name="qualities"
                label="Качества"
                options={qualities}
                defaultValue={data.qualities}
                error={errors.qualities}
                onChange={handleChange}
              />
              <button className="btn btn-primary" disabled={!isValid}>
                Обновить
              </button>
            </form>
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default EditUserPage
