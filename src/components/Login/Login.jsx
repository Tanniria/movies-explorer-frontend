import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Form from "../Form/Form";
import "../Form/Form.css";

export default function Login({ onLogin, errorMessage }) {
  const navigate = useNavigate();
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    if (user.isAuth) navigate('/');
  }, [user]);

  const [loginUserInfo, setLoginUserInfo] = useState({
    email: '',
    password: '',
  });

  function handleChange(evt) {
    const { value, name } = evt.target;
    setLoginUserInfo((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email: loginUserInfo.email,
      password: loginUserInfo.password,
    });
  }
  return (
    <main>
      <section className="login">
        <Form
          title="Рады видеть!"
          buttonText="Войти"
          linkText="Еще не зарегистрированы?"
          link="Регистрация"
          route="/signup"
          onSubmit={handleSubmit}
        >
          <label className="form__wrapper">
            E-mail
            <input
              className="form__input"
              name="email"
              type="email"
              placeholder="Ваш e-mail"
              required
              onChange={handleChange}
              value={loginUserInfo.email || ''}
            />
            <span className="form__input-error"></span>
          </label>
          <label className="form__wrapper">
            Пароль
            <input
              className="form__input"
              name="password"
              type="password"
              placeholder="Введите пароль"
              minLength="8"
              maxLength="40"
              required
              onChange={handleChange}
              value={loginUserInfo.password || ''}
            />
            <span className="form__input-error">{errorMessage}</span>
          </label>
        </Form>
      </section>
    </main>
  );
}