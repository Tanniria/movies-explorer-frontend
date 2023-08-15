import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList() {
    return (
        <section className="movies-cards">
            <ul className="movies-cards__list">
                <MoviesCard />
                <MoviesCard />
                {/* <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard /> */}
            </ul>
        </section>
    );
};