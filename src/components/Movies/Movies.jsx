import React from "react";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

export default function Movies() {
  return (
    <>
      <HeaderMovies />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
        <button className="movies-button" type="button">Ещё</button>
      </main>
      <Footer />
    </>
  )
};
