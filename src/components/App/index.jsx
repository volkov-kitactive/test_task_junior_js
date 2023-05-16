import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

import Main from "../../pages/Main";
import Register from "../../pages/Register";
import Auth from "../../pages/Auth";
import NotFound from "../../pages/NotFound";

import "./App.less";

import * as api from '../../api'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const handleRegistration = async (obj) => {
    console.log(obj);
    await api.register(obj)
      .then(res => console.log(res))
  }

  /*
    ! Реализовать всю логику подключения эндпоинтов в App и потом всё это кинуть в хранилище
   */

  return (
    <div className="page__container">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register handleRegistration={handleRegistration} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
