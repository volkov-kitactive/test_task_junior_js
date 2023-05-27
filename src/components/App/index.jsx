import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";


import Main from "../../pages/Main";
import Register from "../../pages/Register";
import Auth from "../../pages/Auth";
import Cabinet from "../../pages/Cabinet";
import NotFound from "../../pages/NotFound";

import "./App.less";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="page__container">
      <Header currentPath={currentPath} />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<Cabinet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
