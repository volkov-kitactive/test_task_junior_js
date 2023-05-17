import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api";
// import { filesReducer, tokenReducer, fileCountReducer } from "../../store/reducers";
import {
  decrementFileCount,
  incrementFileCount,
  setFiles,
} from "../../store/actions";

const Cabinet = ({ user }) => {
  const dispatch = useDispatch();
  /* Токен не безопасно хранить в сторе редакса, но я использую его лишь для практики */
  const token = useSelector((state) => state.token);
  const filesCount = useSelector((state) => state.fileCount)

  useEffect(() => {
    api
      .getFiles(token)
      .then((res) => {
        dispatch(setFiles(res.data.files));
        dispatch(incrementFileCount(res.data.files.length));
      })
      .catch((err) => console.err(err));
  }, []);

  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">Личный кабинет</h2>
        <p className="main__subtitle">Здравствуйте {user?.email}!</p>
        <p className="main__subtitle">Кол-во файлов: {filesCount}</p>
      </div>
    </main>
  );
};

export default Cabinet;
