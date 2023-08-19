import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import "./Profile.css";
import "../Form/Form.css";
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({ onSignOut, disabled, onUpdateUser }) {
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const buttonClassName = `${disabled ? 'profile__submit-button profile__submit-button_inactive' : 'profile__submit-button'}`
  const disableButton = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  useEffect(() => {
    setIsDisabled(false);
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues, setIsDisabled]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
      resetForm();
    }
  }

  function handleEditProfile() {
    setIsDisabled(true);
  }

  function handleSave() {
    setEditProfile(true);
  }

  return (
    <>
      <HeaderMovies />
      <main>
        <section className="profile">
          <h3 className="profile__title">Привет, Виталий!</h3>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label">Имя
              <input
                className="profile__input"
                name="name"
                type="text"
                placeholder="Ваше имя"
                minLength="2"
                maxLength="30"
                required
                disabled={isDisabled ? false : true}
                onChange={handleChange}
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
                disabled={isDisabled ? false : true}
                onChange={handleChange}
              />
            </label>
            {!isDisabled ? (
              <>
                <button
                  className="profile__button profile__button_edit"
                  type="button"
                  onClick={handleEditProfile}
                >Редактировать
                </button>
                <button
                  className="profile__button profile__button_signout"
                  type="button"
                  // onClick={() => navigate("/")}
                  onClick={onSignOut}
                >Выйти из аккаунта
                </button>
              </>
            ) : (
              <button
                className={buttonClassName}
                type="submit"
                disabled={disableButton}
                onClick={handleSave}
              >Сохранить
              </button>
            )
            }
          </form>
        </section>
      </main>
    </>
  )
};
