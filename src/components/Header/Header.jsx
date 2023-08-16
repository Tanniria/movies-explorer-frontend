import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.svg";
import "./Header.css";

export default function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <Navigation />
    </header>
  )
};