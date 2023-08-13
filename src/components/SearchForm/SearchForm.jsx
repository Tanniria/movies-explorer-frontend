import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import icon from "../../images/search.svg";
import "./SearchForm.css";

export default function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__wrapper">
                <div className="search-form__input-container">
                    <img className="search-form__icon" src={icon} alt="лупа" />
                    <input
                        className="search-form__input"
                        name="films"
                        type="text"
                        placeholder="Фильм"
                    />
                    <button
                        className="search-form__button"
                        type="submit">
                        Найти
                    </button>
                </div>
                <FilterCheckbox />
            </form>
            <div className="search-form__border"></div>
        </section>
    );
};