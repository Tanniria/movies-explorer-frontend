import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";

export default function Movies({onClick, handleLikeClick, savedMovies, onCardDelete, isLoggedIn}) {
  function handleMore() {
    onClick()
  }

  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  // const [allMovies, setAllMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]); //отфильтрованные по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек

  const [isReqErr, setIsReqErr] = useState(false); //ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
  return (
    <>
      <HeaderMovies />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
        <button className="movies-button" type="button" onClick={handleMore}>Ещё</button>
      </main>
      <Footer />
    </>
  )
};
