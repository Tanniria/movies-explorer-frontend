import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import poster from "../../images/movie-poster.jpg";
import movieDuration from "../../utils/utils";
import { MOVIE_URL } from "../../utils/constants";
import "./MoviesCard.css";

export default function MoviesCard({ movie, onSaveClick, }) {
    const location = useLocation();
    // const imgSrc = `https://api.nomorparties.co/${movie.image.url}`;
    const [isMovieSaved, setIsMovieSaved] = useState(false);
    const movieButton = (
        `${isMovieSaved && location.pathname === '/movies' ? "movie-card__button movie-card__button_type_save" : "movie-card__button"}
        ${location.pathname === '/saved-movies' && !isMovieSaved && "movie-card__button_inactive"}
        ${location.pathname === '/saved-movies' && isMovieSaved && "movie-card__button_type_delete"}
        `
    );
    useEffect(() => {
        if (location.pathname === '/saved-movies') {
            setIsMovieSaved(true)
        }
    }, [location.pathname, isMovieSaved]);

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
            <img
                className="movie-card__image"
                src={poster}
                alt="постер к фильму"
            />
            {location.pathname === "/movies" && (
                <button
                    className={`movie-card__button movie-card__button_type_save ${isMovieSaved
                        ? "movie-card__button movie-card__button_type_saved"
                        : ""}`}
                    type="button"
                    onClick={onSaveClick}>
                    {isMovieSaved ? "" : "Сохранить"}
                </button>
            )}
            {location.pathname === "/saved-movies" && (
                <button
                    className="movie-card__button movie-card__button_type_delete"
                    type="button"
                    // onClick={onDeleteClick}
                ></button>
            )}
            {/* <Link to={card.trailerLink} className="movie-card__link" target="_blank"></Link> */}
            <div className="movie-card__info">
                <h2 className="movie-card__title">Семь</h2>
                <p className="movie-card__duration">2ч 7м</p>
            </div>
        </li>
    )
}