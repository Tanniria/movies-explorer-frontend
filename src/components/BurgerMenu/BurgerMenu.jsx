import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./BurgerMenu.css";

export default function BurgerMenu({ onClose, isOpen }) {
  const popupIsOpen = isOpen ? "burger-menu_active" : "";

  return (
    <div className={`burger-menu ${popupIsOpen}`}>
      <div className="burger-menu__container">
        <button type="button" className="burger-menu__close" onClick={onClose} />
        <div className="burger-menu__list">
          <NavLink to='/' className="burger-menu__link">
            Главная
          </NavLink>
          <NavLink to='/movies' className="burger-menu__link">
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className="burger-menu__link">
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link to='/profile' className="burger-menu__account">
          Аккаунт
        </Link>
      </div>
    </div>
  );
};