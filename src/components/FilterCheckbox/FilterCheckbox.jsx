import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ onCheckbox, checked}) {
    return (
        <div className="filter-checkbox">
        <div className="checkbox">
            <input
                className="filter-checkbox__input"
                name="checkbox"
                type="checkbox"
                onChange={onCheckbox}
                checked={checked} />
            <p className="filter-checkbox__text">Короткометражки</p>
        </div>
    </div>
    );
};