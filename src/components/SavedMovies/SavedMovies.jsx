import React from 'react';
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

export default function SavedMovies() {
	return (
		<>
			<HeaderMovies />
			<main className='saved-movies'>
				<SearchForm />
				<MoviesCardList />
			</main>
			<Footer />
		</>
	);
}
