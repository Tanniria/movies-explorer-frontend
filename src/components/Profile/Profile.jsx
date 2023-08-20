import React, { useState, useEffect, useContext } from "react";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import "./Profile.css";

export default function Profile({ signOut, onEditUser, isEditProfile, disabled }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const buttonClassName = `${disabled ? 'profile__submit-button profile__submit-button_inactive' : 'profile__submit-button profile__submit-button:hover'}`
  const inactiveButton = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

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
      onEditUser({
        name: values.name,
        email: values.email,
      });
      resetForm();
    }
  }

  function handleUpdateUser() {
    setIsDisabled(true);
  };

  function handleSaveProfile() {
    setIsEditSuccess(true);
  };

  return (
    <>
      <HeaderMovies />
      <main>
        <section className="profile">
          <h3 className="profile__title">Привет, {currentUser.name}!</h3>
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
                value={values?.name ?? currentUser.name}
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
                value={values?.email ?? currentUser.email}
                disabled={isDisabled ? false : true}
                onChange={handleChange}
              />
            </label>
            <span className="profile__input-error">{errors.email || ''}</span>
            {isEditSuccess && (
              <p className="profile__save">{isEditProfile}</p>
            )}
            {!isDisabled ? (
              <>
                <button
                  to="/"
                  className="profile__button profile__button_edit"
                  type="button"
                  onClick={handleUpdateUser} >
                  Редактировать
                </button>
                <button
                  className="profile__button profile__button_signout"
                  type="button"
                  onClick={signOut} >
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <button
                className={buttonClassName}
                type="submit"
                disabled={inactiveButton}
                onClick={handleSaveProfile} >
                Сохранить
              </button>
            )}
          </form>
        </section>
      </main>
    </>
  )
};
