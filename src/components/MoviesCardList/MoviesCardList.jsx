import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { NOT_FOUND_ERROR, DEFAULT_ERROR } from '../../utils/constants';
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, onLike, isNotFound, isServerError, checkMovieLike, onDelete, isMoviesPage }) {
    return (
        <section className="movies-cards">
            <p className={isNotFound ? "movies-cards__errors_active" : "movies-cards__errors"}
            >{NOT_FOUND_ERROR}</p>
            <p className={isServerError ? "movies-cards__errors_active" : "movies-cards__errors"}>
                {DEFAULT_ERROR}
            </p>
            <ul className="movies-cards__list">
                {movies.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie.id || movie.movieId}
                        checkMovieLike={checkMovieLike}
                        onDelete={onDelete}
                        onLike={onLike}
                        isMoviesPage={isMoviesPage}
                    />
                ))}
            </ul>
        </section>
    );
};