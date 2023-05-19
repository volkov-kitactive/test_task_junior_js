import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormAndValidation } from "../../components/hooks/useFormAndValidation";
import {saveToken} from '../../store/actions'

import * as api from '../../api';

import "./Auth.less";

const Auth = ({ handleLogin }) => {
  const { isValid, values, handleChange } = useFormAndValidation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();

    // handleLogin({ email: values.email, password: values.password });
    api.login({email: values.email, password: values.password})
      .then((res) => {
        if (res.data.token) {
          // сохраняем в стор токен
          dispatch(saveToken(res.data.token))

          // в локалку тоже сохраняю
          localStorage.setItem("token", res.data.token);
          handleLogin({email: values.email}) //так как токен пришёл значит, авторизация прошла успешно, можно поставить значение емейла из инпута
          navigate('/me')
        }
      })
      .catch((err) => console.log(err))
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
