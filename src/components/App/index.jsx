import { Provider, useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
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

import { saveToken } from "../../store/actions";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Меняет стейт входа  */
  const handleLogin = (res) => {
    setLoggedIn(true);
    setUser(res);
  };

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
        setLoggedIn(false);
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
          handleLogin(email); //так как токен пришёл значит, авторизация прошла успешно, можно поставить значение емейла из инпута
          navigate("/me");
        }
      })
      .catch(() => alert("Что-то пошло не так"));
  };

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
        <Route
          path="/me"
          element={
            <ProtectedRoute
              element={Cabinet}
              loggedIn={loggedIn}
              user={user}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
