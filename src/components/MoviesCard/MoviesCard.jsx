import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import poster from "../../images/movie-poster.jpg";
import movieDuration from "../../utils/utils";
import { MOVIE_URL } from "../../utils/constants";
import "./MoviesCard.css";

export default function MoviesCard({ card, movie, handleSave, onDelete, savedMovies, }) {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (location.pathname === '/saved-movies') {
            setIsSaved(true)
        }
    }, [location.pathname, isSaved])

    const movieButton = (
        `${isSaved && location.pathname === '/movies' ? "movie-card__button movie-card__button_type_save" : "movie-card__button"}
        ${location.pathname === '/saved-movies' && !isSaved && "movie-card__button_inactive"}
        ${location.pathname === '/saved-movies' && isSaved && "movie-card__button_type_delete"}
        `
    )

    const onSaveClick = () => {
        const movieCard = {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${MOVIE_URL}${card.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `${MOVIE_URL}${card.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        }

        handleSave(movieCard, setIsSaved);
    };
    const onDeleteClick = () => {
        onDelete(movie._id || movie.id, setIsSaved);
    };
    // useEffect(() => {
    //     const saved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)

    //     if (saved) {
    //         setIsSaved(true)
    //     }
    // }, [savedMovies, movie.id])
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
        {/* <Link to={card.trailerLink} className="movie-card__link" target="_blank"></Link> */}
        <div className="movie-card__info">
            <h2 className="movie-card__title">Семь</h2>
            <p className="movie-card__duration">2ч 7м</p>
        </div>
    </li>
    )
}