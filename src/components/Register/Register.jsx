import React from "react";
import Form from "../Form/Form";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "../Form/Form.css";

export default function Register({ onRegister, isLoading }) {
    const { values, handleChange, errors, isValid } = useFormAndValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister({
            name: values.name,
            email: values.email,
            password: values.password,
        });
    }

    return (
        <main>
            <section className="register">
                <Form
                    title="Добро пожаловать!"
                    buttonText="Зарегистрироваться"
                    linkText="Уже зарегистрированы?"
                    link="Войти"
                    route="/signin"
                    isDisabled={!isValid}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                >
                    <label className="form__wrapper">
                        Имя
                        <input
                            className={`form__input ${!isValid && "form__input_type_error"}`}
                            name="name"
                            type="text"
                            placeholder="Ваше имя"
                            minLength="2"
                            maxLength="40"
                            required
                            onChange={handleChange}
                            value={values.name || ''}
                        />
                        <span className="form__input-error">{errors.name || ''}</span>
                    </label>
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
