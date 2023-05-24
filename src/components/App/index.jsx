import { Provider, useDispatch, useSelector } from "react-redux";

import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

import ProtectedRoute from "../hoc/ProtectedRoute";

import Main from "../../pages/Main";
import Register from "../../pages/Register";
import Auth from "../../pages/Auth";
import Cabinet from "../../pages/Cabinet";
import NotFound from "../../pages/NotFound";

import "./App.less";

import * as api from "../../api";

import { saveToken, setUser, setLoggedIn } from "../../store/actions";
import { useEffect } from "react";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Обращение к api, Регистрация  */
  const handleRegistration = (obj) => {
    api
      .register(obj)
      .then((res) => {
        // если всё норм переходим на страницу входа
        if (res.data.status === "ok") {
          navigate("/login");
        }
      })
      .catch((err) => alert("Регистрация провалилась"));
  };

  /** Обращение к api, выход из системы  */
  const logOut = () => {
    const jwt = localStorage.getItem("token");
    api
      .logout(jwt)
      .then(() => {
        localStorage.removeItem("token");
        navigate("login", { replace: true });
        // setLoggedIn(false);
        dispatch(setLoggedIn(false))
      })
      .catch(() => alert("Что-то пошло не так"));
  };

  /** Обращение к api, вход в систему  */
  const login = (email, password) => {
    api
      .login(email, password)
      .then((res) => {
        if (res.data.token) {
          // сохраняем в стор токен
          dispatch(saveToken(res.data.token));

          // в локалку тоже сохраняю
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("login", true);
          dispatch(setLoggedIn(true))
          dispatch(setUser(email)) //так как токен пришёл значит, авторизация прошла успешно, можно поставить значение емейла из инпута
          navigate("/me");
        }
      })
      .catch(() => alert("Что-то пошло не так"));
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("login");

    if (loggedIn) {
      dispatch(setLoggedIn(true));
    }
  }, []);

  return (
    <div className="page__container">
      <Header currentPath={currentPath} logOut={logOut} />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Auth login={login} />} />
        <Route
          path="/register"
          element={<Register handleRegistration={handleRegistration} />}
        />
        {/* <Route
          path="/me"
          element={
            <ProtectedRoute
              element={Cabinet}
            />
          }
        /> */}
        <Route
          path="/me"
          element={<Cabinet />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
