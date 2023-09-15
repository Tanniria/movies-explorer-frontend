import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import {addMovie, deleteMovie, getAllMovies, getSavedMovies} from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import {useScreen} from '../../hooks/useScreen';
import './Movies.css';

export default function Movies() {
	const location = useLocation();
	const [movies, setMovies] = useState({
		type: '',
		movies: [],
		isChecked: false,
		query: '',
		searchedMovies: [],
	});
	const [moviesState, setMoviesState] = useState({
		allMovies: {
			movies: [],
			type: 'allMovies',
			isChecked: false,
			query: '',
			searchedMovies: [],
		},
		savedMovies: {
			movies: [],
			type: 'savedMovies',
			isChecked: false,
			query: '',
			searchedMovies: [],
		},
	});
	const [filterMode, setFilterMode] = useState(false);
	const {allMovies, savedMovies} = moviesState;
	const [isLoaded, setIsLoaded] = useState(false);
	const [url, setUrl] = useState('');
	const [moviesList, handleAddBtn] = useScreen();
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		location.pathname === '/saved-movies' ? setUrl('savedMovies') : setUrl('allMovies');
		if (movies.isChecked || movies.query) {
			setFilterMode(true);
		} else {
			setFilterMode(false);
			setMovies((prev) => ({...prev, searchedMovies: []}));
		}
	}, [movies.isChecked, movies.query, filterMode, location]);

	useEffect(() => {
		if (location.pathname === '/movies') {
			const obj = JSON.parse(localStorage.getItem('allMovies'));
			setMovies((prev) => ({...prev, ...obj, movies: allMovies.movies}));
		}
		if (location.pathname === '/saved-movies') {
			const obj = JSON.parse(localStorage.getItem('savedMovies'));
			setMovies((prev) => ({...prev, ...obj, movies: savedMovies.movies}));
		}
	}, [allMovies.movies, savedMovies.movies, filterMode, location]);

	useEffect(() => {
		const getMovies = async () => {
			try {
				const [allMoviesData, savedMoviesData] = await Promise.all([getAllMovies(), getSavedMovies()]);
				setMoviesState((prev) => ({
					allMovies: {
						...prev.allMovies,
						movies: allMoviesData,
					},
					savedMovies: {...prev.savedMovies, movies: savedMoviesData},
				}));
				if (!localStorage.getItem('allMovies')) {
					const {movies, ...allResult} = allMovies;
					localStorage.setItem('allMovies', JSON.stringify(allResult));
				}
				if (!localStorage.getItem('savedMovies')) {
					const {movies, ...savedResult} = savedMovies;
					localStorage.setItem('savedMovies', JSON.stringify(savedResult));
				}
				setIsLoaded(true);
			} catch (err) {
				return setErrorMessage(err);
			}
		};
		getMovies();
	}, []);

	const handleSaveMovies = (movie) => {
		if (!savedMovies.movies.includes(movie)) {
			addMovie(movie)
				.then((item) => {
					setMoviesState((prev) => ({
						...prev,
						savedMovies: {
							...savedMovies,
							movies: [...savedMovies.movies, item],
						},
					}));
				})
				.catch((err) => setErrorMessage(err));
			console.log(`Фильм ${movie.nameRU || movie.nameEN} сохранён`);
		} else {
			console.log('Фильм уже сохранён');
			return;
		}
	};

	const handleCheckSave = (movie) => {
		return savedMovies.movies.some((item) => item.movieId === movie.id);
	};

	const handleRemoveMovie = (movie) => {
		const removedMovie = savedMovies.movies.find((item) => item.movieId === (movie.id || movie.movieId));
		if (!removedMovie) return;
		deleteMovie(removedMovie._id)
			.then(() => {
				setMoviesState((prev) => ({
					...prev,
					savedMovies: {
						...prev.savedMovies,
						movies: savedMovies.movies.filter((item) => item.movieId !== removedMovie.movieId),
					},
				}));
				console.log(`Фильм ${movie.nameRU || movie.nameEN} удалён`);
			})
			.catch((err) => setErrorMessage(err));
	};

	return (
		<>
			<HeaderMovies />
			<main className='movies'>
				<SearchForm
					data={movies}
					setMovies={setMovies}
					url={url}
				/>
				{isLoaded ? (
					<MoviesCardList
						movies={filterMode ? movies.searchedMovies.slice(0, moviesList.quantityMovies) : movies.movies.slice(0, moviesList.quantityMovies)}
						onSave={handleSaveMovies}
						onDelete={handleRemoveMovie}
						isSaved={handleCheckSave}
						url={url}
						errorMessage={errorMessage}
					/>
				) : (
					<Preloader />
				)}
				{filterMode
					? moviesList.quantityMovies < movies.searchedMovies.length && (
							<button
								className='movies-button'
								type='button'
								onClick={handleAddBtn}>
								Ещё
							</button>
					  )
					: moviesList.quantityMovies < movies.movies.length && (
							<button
								className='movies-button'
								type='button'
								onClick={handleAddBtn}>
								Ещё
							</button>
					  )}
			</main>
			<Footer />
		</>
	);
}
