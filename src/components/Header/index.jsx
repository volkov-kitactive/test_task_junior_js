import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Header.module.less";
import headerLogo from "../../img/header__logo.svg";
import { logout } from "../../api";

/** Компонет шапки сайта, на эндпоинтах выглядит по разному
 * ? Референс сайта kitActive))
 */
const Header = ({ currentPath }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  /** Обращение к api, выход из системы
   * ? Мне кажется, логичным, что функцию выхода будет лучше реализовать в шапке
   */
  const handleLogOut = () => {
    const jwt = localStorage.getItem("token");
    logout(jwt)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("login", { replace: true });
      })
      .catch(() => alert("Что-то пошло не так с выходом"));
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__slogan}>
          <Link to="/">
            <img
              src={headerLogo}
              alt=" Логотип KitActive."
              className={styles.header__logo}
            />
          </Link>
          <h1 className={styles.header__title}>
            Инновационные решения для здравоохранения
          </h1>
        </div>
        <div className={styles.header__info}>
          <div className={styles.header__boxNumber}>
            <svg
              className={styles.header__numberSvg}
              width="5"
              height="13"
              viewBox="0 0 5 13"
            >
              <path
                d="M785.738,193.457a22.174,22.174,0,0,0,1.136,2.041,0.62,0.62,0,0,1-.144.869l-0.3.3a0.908,0.908,0,0,1-.805.33,4.014,4.014,0,0,1-1.491-.274c-1.2-.679-1.657-2.35-1.9-3.664a13.4,13.4,0,0,1,.024-5.081c0.255-1.316.73-2.991,1.935-3.685a4.025,4.025,0,0,1,1.493-.288,0.888,0.888,0,0,1,.8.322l0.3,0.3a0.634,0.634,0,0,1,.113.875c-0.454.8-.788,1.37-1.132,2.045-0.143.28-.266,0.258-0.557,0.214l-0.468-.072a0.532,0.532,0,0,0-.7.366,8.047,8.047,0,0,0-.023,4.909,0.521,0.521,0,0,0,.7.358l0.468-.075c0.291-.048.4-0.066,0.555,0.207h0Z"
                transform="translate(-782 -184)"
              ></path>
            </svg>
            <a href="tel:+79043042030">+7 904 304 20-30</a>
          </div>
          {currentPath === "/me" ? (
            <button className={styles.header__button} onClick={handleLogOut}>
              Выход
            </button>
          ) : (
            <>
              {token ? (
                <Link to="/me">
                  <button className={styles.header__button}>Вход</button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className={styles.header__button}>Вход</button>
                </Link>
              )}
              <Link to="/register">
                <button className={styles.header__button}>Регистрация</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
