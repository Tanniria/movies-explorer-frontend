import React from "react";
import "./NavTab.css";

export default function NavTab() {
    return (
        <nav className="nav-tab">
            <ul className="nav-tab__list">
                <li className="nav-tab__links">
                    <a className="nav-tab__link" href="#project">О проекте</a>
                </li>
                <li className="nav-tab__links">
                    <a className="nav-tab__link" href="#techs">Технологии</a>
                </li>
                <li className="nav-tab__links">
                    <a className="nav-tab__link" href="#me">Студент</a>
                </li>
            </ul>
        </nav>
    );
};