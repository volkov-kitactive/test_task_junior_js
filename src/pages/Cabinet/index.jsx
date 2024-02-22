import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Russian from "@uppy/locales/lib/ru_RU";

import Uppy from "@uppy/core";
import XHR from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api";
import { incrementFileCount, setFiles, addItem, setCount } from "../../store/actions";

import "./Cabinet.less";

const Cabinet = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filesCount = useSelector((state) => state.fileCount);
  const files = useSelector((state) => state.files);
  const user = useSelector((state) => state.user.email);
  const token = localStorage.getItem("token");

  /* конфиг uppy
   * Я использовал загрузчик uppy так как он симпатичный и мощный из под коробки
   ? Тут я не понял про кол-во файлов. поэтому сделал так,
   ? если у пользователя 20 файлов то больше он не сможет добавлять
   ? Максимальный вес 1мб за запрос
   * разрешены все фото, а с документами пришлось повозиться, первый раз вижу такие форматы(спасибо stackoverflow)
  */
  const uppy = new Uppy({
    // русский язык
    locale: Russian,
    restrictions: {
      maxNumberOfFiles: 20 - filesCount,
      maxTotalFileSize: 1048576,
      allowedFileTypes: [
        "image/*",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/msword",
        "application/vnd.ms-powerpoint",
      ],
    },
  });

  /* отображаемые файлы в разметке
  */
  const filesElements = files.map((el) => (
    <Card
      key={el.id}
      name={el.name}
      id={el.id}
      mimeType={el.mimeType}
      fileName={el.fileName}
    />
  ));

  /**  Отправляем файл на сервер, при помощи загрузчика xhr от uppy
   * ! XHR НЕ ВОЗВРАЩАЕТ ПРОМИСС!!
   */
  uppy
    .use(XHR, {
      endpoint: "https://job.kitactive.ru/api/media/upload",
      formData: true,
      fieldName: "files[]",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    /** При успешной загрузке добавляем в массив и меняем счётчик
     * ! Работает для каждого файла отдельно
     */
    .on("upload-success", (file, response) => {
      dispatch(incrementFileCount(1));
      dispatch(addItem(file.data));
    })
    // Обрабатываем ошибку
    .on("upload-error", (file, error, response) => {
      console.log(`Файл ${file.data.name} не загрузился`);
    })
    // после загрузки всех файлов, вызываем их получение
    // это исправляет баг с удалением загрузкой только что отправленных файлов
    .on("complete", (result) => {
      api.getFiles(token).then((res) => {
        dispatch(setFiles(res.data.files));
      });
    });

  /** При монтировании грузим с сервера и сохраняем в стор */
  useEffect(() => {
    // если токена нет, то переходим на страницу логина
    if (!token) {
      return navigate("/login");
    }

    api
      .getFiles(token)
      .then((res) => {
        dispatch(setFiles(res.data.files));
        dispatch(incrementFileCount(res.data.files.length));
      })
      .catch((err) => console.err(err));

      // ! при размонтировании ставим значение в 0
      // ? избавляет от бага, когда колво файлов растёт, при переходе по страницам
    return () => dispatch(setCount(0))
  }, []);


  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">Личный кабинет</h2>
        <p className="main__subtitle">
          Здравствуйте {user || localStorage.getItem("email")}!
        </p>
        <p className="main__subtitle">
          {filesCount > 0
            ? `Кол-во ваших файлов: ${filesCount}`
            : "Вы ещё не загружали файлы :("}
        </p>
        <div className="main__info">
          <div className="cards">{filesElements}</div>
          <Dashboard
            uppy={uppy}
            note="Вы можете добавлять максимум 20 файлов. Максимальный вес за запрос 1МБ."
          />
        </div>
      </div>
    </main>
  );
};

export default Cabinet;
