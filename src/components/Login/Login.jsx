import React from "react";
import { Navigate } from "react-router-dom";
import Form from "../Form/Form";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "../Form/Form.css";

export default function Login({ onLogin, isLoading, isLoggedIn }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!values.email || !values.password) {
            return
        }
        onLogin({
            email: values.email,
            password: values.password,
        });
        resetForm();
    }

    if (isLoggedIn) return (<Navigate to='/' replace />)

    return (
        <main>
            <section className="login">
                <Form
                    title="Рады видеть!"
                    buttonText="Войти"
                    linkText="Еще не зарегистрированы?"
                    link="Регистрация"
                    route="/signup"
                    isDisabled={!isValid}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}>
                    <label className="form__wrapper">
                        E-mail
                        <input
                            className={`form__input ${!isValid && "form__input_type_error"}`}
                            name="email"
                            type="email"
                            placeholder="Ваш e-mail"
                            required
                            onChange={handleChange}
                            value={values.email || ''}
                        />
                        <span className="form__input-error">{errors.email || ''}</span>
                    </label>
                    <label className="form__wrapper">
                        Пароль
                        <input
                            className={`form__input ${!isValid && "form__input_type_error"}`}
                            name="password"
                            type="password"
                            placeholder="Введите пароль"
                            minLength="8"
                            maxLength="40"
                            required
                            onChange={handleChange}
                            value={values.password || ''}
                        />
                        <span className="form__input-error">{errors.password || ''}</span>
                    </label>
                </Form>
            </section>
        </main>
    );
};
