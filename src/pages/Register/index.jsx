import { Link } from "react-router-dom";

import { useFormAndValidation } from "../../components/hooks/useFormAndValidation";

import "./Register.less";
// import { register } from "../../api";

const Register = ({ handleRegistration }) => {
  // const navigate = useNavigate();
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
      handleRegistration({
        email: values.email,
        password: values.password,
        name: values.name,
      });
    }
  };

  return (
    <main className="main">
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form action="#" className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__group">
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

            <input
              type="email"
              name="email"
              // pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
              placeholder="Email"
              minLength="3"
              required
              className="form__input"
              onChange={handleChange}
              value={values.email || ""}
            />

            <input
              type="password"
              name="password"
              placeholder="Пароль"
              minLength="4"
              required
              className="form__input"
              onChange={(e) => handleChange(e)}
              value={values.password || ""}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Повторите пароль"
              minLength="4"
              required
              className="form__input"
              onChange={(e) => handleChange(e)}
              value={values.confirmPassword || ""}
            />
          </div>
          <span className="form__span">{errors.confirmPassword}</span>

          <button
            type="submit"
            className={`form__button ${isValid ? "" : "form__button_disabled"}`}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
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
