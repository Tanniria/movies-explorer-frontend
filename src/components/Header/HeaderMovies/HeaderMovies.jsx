import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../images/logo.svg";
import BurgerMenu from "../../BurgerMenu/BurgerMenu";
import "./HeaderMovies.css";

export default function HeaderMovies() {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const closePopups = () => {
        setIsBurgerMenuOpen(false);
    };

    const openPopup = () => {
        setIsBurgerMenuOpen(true);
    };

    return (
        <header className="header-movies">
            <nav className="nav-movies">
                <Link to='/' className="header-movies__logo">
                    <img src={logo} alt="логотип" />
                </Link>
                <ul className="header-movies__links">
                    <li>
                        <NavLink
                            to="/movies"
                            className={({ isActive }) => `header-movies__link ${isActive ? "header-movies__link_active" : ""}`}
                        > Фильмы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/saved-movies"
                            className={({ isActive }) => `header-movies__link ${isActive ? "header-movies__link_active" : ""}`}
                        > Сохранённые фильмы
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="header-movies__menu-container">
                <button className="header-movies__burger-menu-button"
                    type="button"
                    onClick={openPopup}
                ></button>
            </div>
            <div className="header-movies__nav-container">
                <Link
                    to="/profile"
                    className="header-movies__link header-movies__link-account"
                > Аккаунт
                </Link>
            </div>
            <BurgerMenu isOpen={isBurgerMenuOpen} onClose={closePopups} />
        </header>
    );
};