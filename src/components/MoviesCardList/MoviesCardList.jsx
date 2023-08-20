import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, onLike, checkMovieLike, onDelete, isMoviesPage }) {
    return (
        <section className="movies-cards">
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