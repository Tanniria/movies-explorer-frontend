import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Form.css";

export default function Form({ title, children, buttonText, linkText, route, link, isDisabled, isLoading }) {
    return (
        <div className="form">
            <Link to="/" className="form__logo">
                <img src={logo} alt="Логотип" />
            </Link>
            <h2 className="form__title">{title}</h2>
            <form className="form__container">
                {children}
                <button
                    type="submit"
                    isDisabled={isDisabled ? true : false}
                    className={
                        isDisabled || isLoading
                            ? 'form__submit-button form__submit-button_inactive'
                            : 'form__submit-button'
                    } >
                    {buttonText}
                </button>
            </form>
            <p className="form__text">
                {linkText}
                <Link to={route} className="form__link">
                    {link}
                </Link>
            </p>
        </div>
    );
};