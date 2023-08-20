import React, { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import useResize from "../../hooks/useResize";
import {
  NUMBER_CARDS_12,
  NUMBER_CARDS_8,
  NUMBER_CARDS_5,
  NUMBER_ADDED_CARDS_3,
  NUMBER_ADDED_CARDS_2,
  SCREEN_MD,
  SCREEN_XL,
  SCREEN_XS,
  SCREEN_LG,
} from "../../utils/constants";
import "./Movies.css";

export default function Movies({ movies, isLoggedIn, onSubmit, isLoadind, onCheckbox, checked, checkMovieLike, savedMovies, onLike, onDelete,  isNotFound, isServerError }) {

  const width = useResize();
  const [numberAddMovies, setNumberAddMovies] = useState(''); // число добавляемых карточек, при нажатии на кнопку ещё
  const [moviesList, setMoviesList] = useState({}); // стейт показываемых на странице карточек
  useEffect(() => {
    if (useResize > SCREEN_XL) {
      setMoviesList(NUMBER_CARDS_12);
      setNumberAddMovies(NUMBER_ADDED_CARDS_3);
    }
    if (useResize < SCREEN_LG && useResize >= SCREEN_MD) {
      setMoviesList(NUMBER_CARDS_8);
      setNumberAddMovies(NUMBER_ADDED_CARDS_2);
    }
    if (useResize < SCREEN_XS) {
      setMoviesList(NUMBER_CARDS_5);
      setNumberAddMovies(NUMBER_ADDED_CARDS_2);
    }
  }, [useResize]);

  // обработчик нажатий на кнопку 'Ещё'
  const handleButtonClick = () => {
    setMoviesList(moviesList + numberAddMovies);
  };

  const searchKeyword = localStorage.getItem('searchKeyword') || '';
  return (
    <>
      <HeaderMovies />
      <main className="movies">
        <SearchForm
          onSubmit={onSubmit}
          onCheckbox={onCheckbox}
          checked={checked}
          defaultValue={searchKeyword}
        />
        {isLoadind ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies.slice(0, moviesList)}
            onLike={onLike}
            onDelete={onDelete}
            checkMovieLike={checkMovieLike}
            savedMovies={savedMovies}
            isMoviesPage={true}
            isNotFound={isNotFound}
            isServerError={isServerError}
          />
        )}
        <button className={
          movies.length <= 7 || moviesList >= movies.length
            ? "movies-button_hidden"
            : "movies-button"
        }
          type="button"
          onClick={handleButtonClick} >
          Ещё
        </button>
      </main>
      <Footer />
    </>
  )
};
