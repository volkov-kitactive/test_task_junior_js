import { Provider } from "react-redux";
import store from "../../store";

import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const handleRegistration = (obj) => {
    api.register(obj).then((res) => console.log(res));
  };

  const handleLogin = (res) => {
    setLoggedIn(true);
    setUser(res);
  };

  const logOut = () => {
    const jwt = localStorage.getItem("token");
    api
      .logout(jwt)
      .then(() => {
        localStorage.removeItem("token");
        navigate("login", { replace: true });
        setLoggedIn(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Provider store={store}>
      <div className="page__container">
        <Header currentPath={currentPath} logOut={logOut} />

        <Routes>
          <Route
            path="/me"
            element={
              <ProtectedRoute
                element={Cabinet}
                loggedIn={loggedIn}
                user={user}
              />
            }
          />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Auth handleLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register handleRegistration={handleRegistration} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Provider>
  );
}

export default App;
