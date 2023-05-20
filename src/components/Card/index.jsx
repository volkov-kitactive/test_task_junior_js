import * as api from "../../api";
import { useSelector, useDispatch } from "react-redux";

import "./Card.less";
import { FaFile, FaFileImage } from "react-icons/fa";

import { decrementFileCount, deleteItem } from "../../store/actions";

const Card = ({ name, id, mimeType, fileName }) => {
  const files = useSelector((state) => state.files);
  const dispatch = useDispatch();

  /* Функция скачивает файл, на комп */
  const handleDownload = (e) => {
    const jwt = localStorage.getItem("token");
    api.getOneFile(jwt, id).then((res) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // запрещаем всплытие
    const jwt = localStorage.getItem("token");
    api.deleteOneFile(jwt, id).then(() => {
      dispatch(deleteItem(id));
      console.log(files.length);
      dispatch(decrementFileCount(1));
    });
  };

  return (
    <article className="card" onClick={handleDownload}>
      {mimeType === "image/png" ? (
        <FaFileImage className="card__image" />
      ) : (
        <FaFile className="card__image" />
      )}
      <p className="card__name">{name}</p>
      <button onClick={handleDelete}>Удалить файл</button>
    </article>
  );
};

export default Card;
