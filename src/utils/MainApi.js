// import { BASE_URL } from "./constants";
import { checkResponse } from "./constants";
const BASE_URL = 'http://localhost:3000';

// изменяем данные профиля на сервере
export function editUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
        }),
    })
        .then((res) => checkResponse(res));
};

export function getSavedMovies() {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => checkResponse(res));
};

export function postMovieCards(movie) {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co/${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        }),
    })
        .then((res) => checkResponse(res));
};

export function deleteCard (id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => checkResponse(res));
};