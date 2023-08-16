import React from "react";
import { Link } from 'react-router-dom';
import "./Navigation.css";

export default function Navigation() {
  return (
    <div className="nav-main">
      <Link to="/signup" className="nav-main__link">Регистрация</Link>
      <Link to="/signin" className="nav-main__link nav-main__link-black">Войти</Link>
    </div>
  );
};