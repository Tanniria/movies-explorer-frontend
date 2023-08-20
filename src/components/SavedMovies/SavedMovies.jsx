import React from "react";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

export default function SavedMovies({
  movies,
  onCheckbox,
  checkMovieLike,
  onSubmit,
  checked,
  isNotFound,
  savedMovies,
  onLike,
  onDelete}) {
  return (
    <>
      <HeaderMovies />
      <main className="saved-movies">
        <SearchForm 
          onSubmit={onSubmit}
          onCheckbox={onCheckbox}
          checked={checked}
        />
        <MoviesCardList
          movies={movies}
          onDelete={onDelete}
          onLike={onLike}
          savedMovies={savedMovies}
          isMoviesPage={false}
          checkMovieLike={checkMovieLike}
          isNotFound={isNotFound}
        />
      </main>
      <Footer />
    </>
  )
};
