import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "../../components/Form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { setUser, saveToken } from "../../store/actions";
import { login } from "../../api";
import "./Auth.less";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // кастомный хук обработки формы и её валидации
  const { isValid, values, handleChange, errors } = useFormAndValidation();

  /** Обращение к api, вход в систему  */
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/me");
    } else {
      login({ email: values.email, password: values.password })
        .then((res) => {
          if (res.data.token) {
            // сохраняем в стор токен
            dispatch(saveToken(res.data.token));

            // в локалку тоже сохраняю
            localStorage.setItem("token", res.data.token);
            // ! добавляем email в локальное хранилище
            // ! так как у сервера не ручки авторизации при обновлении странцы
            // ! емейл пропадает. Есть и другие варианты решения этой проблемы
            // ! но эта одна из самых простых, конечно в реальном проекте, такое дело наказуемо
            localStorage.setItem("email", values.email);
            dispatch(setUser({ email: values.email })); //так как токен пришёл значит, авторизация прошла успешно, можно поставить значение емейла из инпута
            navigate("/me");
          }
        })
        .catch(() => alert("Что-то пошло не так c входом"));
    }
  };

  return (
    <main className="main">
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <Form
          buttonText="Войти"
          isButtonDisabled={!isValid}
          submit={handleSubmit}
        >
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
        </Form>
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
