import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderMovies />
      <section className="profile">
        <h3 className="profile__title">Привет, Виталий!</h3>
        <form className="profile__form">
          <label className="profile__label">Имя
            <input
              className="profile__input"
              name="name"
              type="text"
              placeholder="Ваше имя"
              minLength="2"
              maxLength="30"
              required
            />
          </label>
          <div className="profile__line"></div>
          <label className="profile__label">E-mail
            <input
              className="profile__input"
              name="email"
              type="email"
              placeholder="E-mail"
              required
            />
          </label>
          <button className="profile__button profile__button_edit" type="button">Редактировать</button>
          <button className="profile__button profile__button_signout" type="button" onClick={() => navigate("/")}>Выйти из аккаунта</button>
        </form>
      </section>
    </>
  )
};
