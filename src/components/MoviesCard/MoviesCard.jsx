import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import poster from "../../images/movie-poster.jpg";
import "./MoviesCard.css";

export default function MoviesCard({ onDelete, trailerLink }) {
    const [isSaved, setIsSaved] = useState(false);
    const location = useLocation();

    const onSaveClick = () => {
        setIsSaved(!isSaved);
    };
    const onDeleteClick = () => {
        onDelete();
    };
    return (
        <li className="movie-card">
            <img
                className="movie-card__image"
                src={poster}
                alt="постер к фильму"
            />
            {location.pathname === "/movies" && (
                <button
                    className={`movie-card__button movie-card__button_type_save ${isSaved
                        ? "movie-card__button movie-card__button_type_saved"
                        : ""}`}
                    type="button"
                    onClick={onSaveClick}>
                    {isSaved ? "" : "Сохранить"}
                </button>
            )}
            {location.pathname === "/saved-movies" && (
                <button
                    className="movie-card__button movie-card__button_type_delete"
                    type="button"
                    onClick={onDeleteClick}
                ></button>
            )}
            <Link to={trailerLink} className="movie-card__link" target="_blank"></Link>
            <div className="movie-card__info">
                <h2 className="movie-card__title">Семь</h2>
                <p className="movie-card__duration">2ч 7м</p>
            </div>
        </li>
    );
};