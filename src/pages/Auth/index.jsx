import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../components/hooks/useFormAndValidation";

import "./Auth.less";

const Auth = ({ login }) => {
  // кастомный хук обработки формы и её валидации
  const { isValid, values, handleChange, errors } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // колбэком возвращаем значения обратно в App, так как логика входа у нас там
    login({ email: values.email, password: values.password });
  };

  return (
    <main className="main">
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="form" noValidate action="#" onSubmit={handleSubmit}>
          <div className="form__group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              minLength="3"
              required
              className="form__input"
              value={values.email || ""}
              onChange={handleChange}
            />
            <span className="form__span">{errors.email}</span>

            <input
              type="password"
              name="password"
              placeholder="Пароль"
              className="form__input"
              required
              minLength="5"
              value={values.password || ""}
              autoComplete="off"
              onChange={handleChange}
            />
            <span className="form__span">{errors.password}</span>

          </div>

          <span className="form__span"></span>

          <button
            type="submit"
            className={`form__button ${isValid ? "" : "form__button_disabled"}`}
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        <p className="auth__subtitle">
          Не{" "}
          <Link className="link" to="/register">
            зарегистрированы?
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Auth;
