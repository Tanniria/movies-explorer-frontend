import React from "react";
import image from "../../images/avatar.jpg";
import "./AboutMe.css";

export default function AboutMe() {

  return (
    <section className="about-me" id="me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Татьяна</h3>
          <p className="about-me__job">Фронтенд-разработчик, 30 года</p>
          <p className="about-me__text">
            Живу и работаю в Челябинске, закончила исторический факультет ЮУрГУ и КФУ.
            Люблю видеоигры, книги и танцы. Я пошла на курс Веб-разработки, так как я люблю
            изучать новое. Хочу и дальше развиваться в этом направлении для дальнейшего нахождения работы.
          </p>
          <a
            href="https://github.com/Tanniria"
            className="about-me__link"
            target="blank" >
            Github
          </a>
        </div>
        <img
          src={image}
          alt="мое фото"
          className="about-me__photo" />
      </div>
    </section>
  );
};