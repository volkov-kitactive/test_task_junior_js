import { Link, useNavigate } from "react-router-dom";

import { useFormAndValidation } from "../../hooks/useFormAndValidation";

import Form from "../../components/Form";

import "./Register.less";

import { register } from "../../api";

const Register = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, isValid, setErrors } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Добавлет ошибку при сабмите если пароли не верны */
    if (values.password !== values.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Пароли не совпадают",
      });
      return;
    } else {
      /** Обращение к api, Регистрация  */
      register({
        email: values.email,
        password: values.password,
        name: values.name,
      })
        .then((res) => {
          // если всё норм переходим на страницу входа
          if (res.data.status === "ok") {
            navigate("/login");
          }
        })
        .catch(() => alert("Регистрация провалилась"));
    }
  };

  return (
    <main className="main">
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <Form buttonText='Зарегистрироваться' isButtonDisabled={!isValid} submit={handleSubmit}>
          <>
            <input
              type="text"
              name="name"
              placeholder="Имя"
              minLength="3"
              required
              className="form__input"
              onChange={handleChange}
              value={values.name || ""}
            />
            <span className="form__span">{errors.name}</span>

            <input
              type="email"
              name="email"
              placeholder="Email"
              minLength="3"
              required
              className="form__input"
              onChange={handleChange}
              value={values.email || ""}
            />
            <span className="form__span">{errors.email}</span>

            <input
              type="password"
              name="password"
              placeholder="Пароль"
              minLength="5"
              required
              className="form__input"
              onChange={(e) => handleChange(e)}
              value={values.password || ""}
            />
            <span className="form__span">{errors.password}</span>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Повторите пароль"
              minLength="5"
              required
              className="form__input"
              onChange={(e) => handleChange(e)}
              value={values.confirmPassword || ""}
            />
            <span className="form__span">{errors.confirmPassword}</span>
          </>
        </Form>
        <p className="auth__subtitle">
          Уже зарегистрированы?{" "}
          <Link className="link" to="/login">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
