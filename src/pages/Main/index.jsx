// import * as React from "react";
import { Component } from "react";
import img from "../../img/main__img.svg";
import "./Main.less";

/* Простенький классовый компонент, который только возвращает разметку */
class Main extends Component {
  render() {
    return (
      <main className="main">
        <div className="main__container">
          <h2 className="main__title">Преимущества KITACTIVE</h2>
          <section className="advantages">
            <article className="cards">
              <img src={img} alt="" />
              <h3 className="cards__title">Экономия</h3>
              <p className="cards__subtitle">
                МИНИМУМ ЗАТРАТ ЗА СЧЕТ СВОЕВРЕМЕННОГО ОБСЛУЖИВАНИЯ
              </p>
            </article>
            <article className="cards">
              <img src={img} alt="" />
              <h3 className="cards__title">Экономия</h3>
              <p className="cards__subtitle">
                МИНИМУМ ЗАТРАТ ЗА СЧЕТ СВОЕВРЕМЕННОГО ОБСЛУЖИВАНИЯ
              </p>
            </article>
            <article className="cards">
              <img src={img} alt="" />
              <h3 className="cards__title">Экономия</h3>
              <p className="cards__subtitle">
                МИНИМУМ ЗАТРАТ ЗА СЧЕТ СВОЕВРЕМЕННОГО ОБСЛУЖИВАНИЯ
              </p>
            </article>
            <article className="cards">
              <img src={img} alt="" />
              <h3 className="cards__title">Экономия</h3>
              <p className="cards__subtitle">
                МИНИМУМ ЗАТРАТ ЗА СЧЕТ СВОЕВРЕМЕННОГО ОБСЛУЖИВАНИЯ
              </p>
            </article>
          </section>
        </div>
      </main>
    );
  }
}

export default Main;

/* const Main = () => {
  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">Преимущества KITACTIVE</h2>
        <section className="advantages">
          <article className="cards">
            <img src={img} alt="" />
            <h3 className="cards__title">Экономия</h3>
            <p className="cards__subtitle">МИНИМУМ ЗАТРАТ ЗА СЧЕТ СВОЕВРЕМЕННОГО ОБСЛУЖИВАНИЯ</p>
          </article>
          <article className="cards">
            <img src={img} alt="" />
            <h3 className="cards__title">Экономия</h3>
            <p className="cards__subtitle">МИНИМУМ ЗАТРАТ ЗА СЧЕТ СВОЕВРЕМЕННОГО ОБСЛУЖИВАНИЯ</p>
          </article>
          <article className="cards">
            <img src={img} alt="" />
            <h3 className="cards__title">Экономия</h3>
            <p className="cards__subtitle">МИНИМУМ ЗАТРАТ ЗА СЧЕТ СВОЕВРЕМЕННОГО ОБСЛУЖИВАНИЯ</p>
          </article>
          <article className="cards">
            <img src={img} alt="" />
            <h3 className="cards__title">Экономия</h3>
            <p className="cards__subtitle">МИНИМУМ ЗАТРАТ ЗА СЧЕТ СВОЕВРЕМЕННОГО ОБСЛУЖИВАНИЯ</p>
          </article>
        </section>
      </div>
    </main>
  );
}; */
