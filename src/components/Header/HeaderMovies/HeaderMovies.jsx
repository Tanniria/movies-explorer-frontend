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
        <header className="header__nav-movies">
            <nav className="nav-movies">
                <Link to='/' className="header__logo">
                    <img src={logo} alt="логотип" />
                </Link>
                <ul className="nav-movies__links">
                    <li>
                        <NavLink
                            to="/movies"
                            className="nav-movies__link nav-movies__link-movies"
                            activeclassname="active"
                        > Фильмы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/saved-movies"
                            className="nav-movies__link nav-movies__link_saved"
                            activeclassname="active"
                        > Сохранённые фильмы
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="nav-movies__menu-container">
                <button className="nav__burger-menu-button"
                    type="button"
                    onClick={openPopup}
                ></button>
            </div>
            <div className="nav__container">
                <Link
                    to="/profile"
                    className="nav-movies__link nav-movies__link-account"
                > Аккаунт
                </Link>
            </div>
            <BurgerMenu isOpen={isBurgerMenuOpen} onClose={closePopups} />
        </header>
    );
};