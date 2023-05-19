import { useMemo } from "react";

import Card from "../../components/Card";

import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
// import DragDrop from '@uppy/drag-drop';

import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api";
// import { filesReducer, tokenReducer, fileCountReducer } from "../../store/reducers";
import {
  decrementFileCount,
  incrementFileCount,
  setFiles,
  addItem,
} from "../../store/actions";

import './Cabinet.less'

const Cabinet = ({ user, handle }) => {
  const dispatch = useDispatch();
  /* Токен не безопасно хранить в сторе редакса, но я использую его лишь для практики */
  const token = useSelector((state) => state.token);
  const filesCount = useSelector((state) => state.fileCount);
  const files = useSelector((state) => state.files);

  /* конфиг uppy */
  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: 20,
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

  /* отображаемые файлы в разметке */
  const filesElements = files.map((el) => (
    <Card
      key={el.id}
      name={el.name}
      id={el.id}
      mimeType={el.mimeType}
      fileName={el.fileName}
    />
  ));

  /**  Отправляем файл на сервер, при помощи загрузчика xhr от uppy */
  uppy
    .use(XHRUpload, {
      endpoint: "https://job.kitactive.ru/api/media/upload",
      formData: true,
      fieldName: "files[]",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .on("upload-success", (file, response) => {
      dispatch(incrementFileCount(1));
      dispatch(addItem(file.data));
    });

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
        <div className="main__info">
          <div className="cards">{filesElements}</div>
          <Dashboard uppy={uppy} />
        </div>
      </div>
    </main>
  );
};

export default Cabinet;
