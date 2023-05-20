import { Link } from "react-router-dom";

import "./NotFound.less";

/** На этот компонет будет выкидывать если путь не найден
 * ? replace - при переходе заменяет в истории путь
 */
const NotFound = () => {
  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">
        Такой страницы не существует! Перейти на{" "}
        <Link className="link" to="/" replace>
          главную
        </Link>{" "}
        ?
      </h2>
    </main>
  );
};

export default NotFound;
