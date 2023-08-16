import React from "react";
import sign from "../../images/sign.svg";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav>
        <ul className="portfolio__list">
          <li className="portfolio__text">
            <a className="portfolio__link" href="https://tanniria.github.io/how-to-learn/" target="_blank" rel="noreferrer" >Статичный сайт
              <img className="portfolio__img" src={sign} alt="стрелка" />
            </a>
          </li>
          <li className="portfolio__text">
            <a className="portfolio__link" href="https://tanniria.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт
              <img className="portfolio__img" src={sign} alt="стрелка" />
            </a>
          </li>
          <li className="portfolio__text">
            <a className="portfolio__link" href="https://tanniria.github.io/mesto-react/" target="_blank" rel="noreferrer">Одностраничное приложение
              <img className="portfolio__img" src={sign} alt="стрелка" />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};
