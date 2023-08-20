import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import icon from "../../images/search.svg";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "./SearchForm.css";

export default function SearchForm({ onSubmit, onCheckbox, checked, defaultValue }) {
    const [errorText, setErrorText] = useState(''); // Переменная состояния ошибки
    const [keyword, setKeyword] = useState(''); // ВВедёные значения по ключевому слову
    const { isValid, handleChange } = useFormAndValidation();
    useEffect(() => {
        setKeyword(defaultValue);
    }, [defaultValue]);
    const handleSubmit = (evt) => {
        evt.preventDefault(); // отменяем действие по умолчанию
        if (!isValid) {
            setErrorText('Введите ключевое слово');
            return;
        }
        onSubmit(keyword);
    };
    const handleChangeForm = (evt) => {
        setKeyword(evt.target.value);
        handleChange(evt);
    };
    return (
        <section className="search-form">
            <form className="search-form__wrapper" onSubmit={handleSubmit} noValidate>
                <div className="search-form__input-container">
                    <img className="search-form__icon" src={icon} alt="лупа" />
                    <input
                        className="search-form__input"
                        name="films"
                        type="text"
                        placeholder="Фильм"
                        required
                        value={keyword || ''}
                        onChange={handleChangeForm}
                    />
                    <button
                        className="search-form__button"
                        type="submit">
                        Найти
                    </button>
                </div>
                <span className="search-form__error">{!isValid && errorText}</span>
                <FilterCheckbox onCheckbox={onCheckbox} checked={checked} />
            </form>
            <div className="search-form__border"></div>
        </section>
    );
};