import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import movieDuration from "../../utils/utils";
import "./MoviesCard.css";

export default function MoviesCard({ movie, onLike, checkMovieLike, onDelete, isMoviesPage }) {
    const location = useLocation().pathname;
    const [isMovieSaved, setIsMovieSaved] = useState(false);
    const movieButtonClass = (
        `${isMovieSaved && location.pathname === '/movies' ? "movie-card__button movie-card__button_type_save" : "movie-card__button"}
        ${location.pathname === '/saved-movies' && !isMovieSaved && "movie-card__button_inactive"}
        ${location.pathname === '/saved-movies' && isMovieSaved && "movie-card__button_type_delete"}
        `
    );

    function onLikeClick() {
        onLike(movie);
    }
    function onDeleteClick() {
        onDelete(movie);
    }

    return (
        // <li className="movie-card">
        //     <img
        //         className="movie-card__image"
        //         src={poster}
        //         alt="постер к фильму"
        //     />
        //     {location.pathname === "/movies" && (
        //         <button
        //             className={`movie-card__button movie-card__button_type_save ${isSaved
        //                 ? "movie-card__button movie-card__button_type_saved"
        //                 : ""}`}
        //             type="button"
        //             onClick={onSaveClick}>
        //             {isSaved ? "" : "Сохранить"}
        //         </button>
        //     )}
        //     {location.pathname === "/saved-movies" && (
        //         <button
        //             className="movie-card__button movie-card__button_type_delete"
        //             type="button"
        //             onClick={onDeleteClick}
        //         ></button>
        //     )}
        //     <Link to={trailerLink} className="movie-card__link" target="_blank"></Link>
        //     <div className="movie-card__info">
        //         <h2 className="movie-card__title">Семь</h2>
        //         <p className="movie-card__duration">2ч 7м</p>
        //     </div>
        // </li>
        <li className="movie-card">
            <a
                className="movie-card__link"
                href={movie.trailerLink}
                target='_blank'
                rel="noreferrer"
            >
                <img
                    className="movie-card__image"
                    src={
                        location === '/movies'
                            ? `https://api.nomoreparties.co/${movie.image.url}`
                            : `${movie.image}`
                    }
                    alt={`постер к ${movie.nameRU || movie.nameEN}`}
                />
            </a>
            <button
                className={movieButtonClass}
                type="button"
                onClick={location === '/saved-movies'
                    ? onDeleteClick
                    : isMovieSaved
                        ? onDeleteClick
                        : onLikeClick
                }
            >{!isMovieSaved && 'Сохранить'}</button>
            <div className="movie-card__info">
                <h2 className="movie-card__title">{movie.nameRU || movie.nameEN}</h2>
                <p className="movie-card__duration">{movieDuration(movie.duration)}</p>
            </div>
        </li>
    )
}