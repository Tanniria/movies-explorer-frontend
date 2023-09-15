import {BASE_URL, MOVIES_URL, responseConstructor} from '../utils/apiUtils';

export const getAllMovies = () => responseConstructor(MOVIES_URL, 'GET', null, false);
export const getSavedMovies = () => responseConstructor(`${BASE_URL}/movies`, 'GET', null, true);
export const addMovie = (movie) =>
	responseConstructor(
		`${BASE_URL}/movies`,
		'POST',
		JSON.stringify({
			country: movie.country,
			director: movie.director,
			duration: movie.duration,
			year: movie.year,
			description: movie.description,
			image: `https://api.nomoreparties.co/${movie.image.url}`,
			trailerLink: movie.trailerLink,
			thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
			movieId: movie.id,
			nameRU: movie.nameRU || 'нет данных',
			nameEN: movie.nameEN || 'нет данных',
		}),
		true,
	);

export const deleteMovie = (id) => responseConstructor(`${BASE_URL}/movies/${id}`, 'DELETE', null, true);
