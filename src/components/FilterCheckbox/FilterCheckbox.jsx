import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ onFilter, isMovieShort}) {
    return (
        <div className="filter-checkbox">
        <div className="checkbox">
            <input
                className="filter-checkbox__input"
                name="checkbox"
                type="checkbox"
                onChange={onFilter}
                checked={isMovieShort}/>
            <p className="filter-checkbox__text">Короткометражки</p>
        </div>
    </div>
    );
};