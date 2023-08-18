// import { BASE_URL } from "./constants";
import { MOVIE_URL } from "./constants";
export const BASE_URL = 'http://localhost:3000';

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// регистрация
export function register(name, email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
    })
        .then((res) => checkResponse(res))
};
// авторизация
export function login(data) {
    // console.log(data);
    const { email, password } = data;
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                return data;
            }
            return Promise.reject(`Ошибка ${data.status}`)
        })
};
//п проверка токена 
export function checkToken() {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((res) => checkResponse(res))
        .then((data) => data);
};
// делаем запрос и получаем данные профиля
export function getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => checkResponse(res));
};
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
            about: data.email,
        }),
    })
        .then((res) => checkResponse(res));
};

export function getMovieCards() {
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

export function postMovieCards(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: `${MOVIE_URL}${data.image.url}`,
            trailerLink: data.trailerLink,
            thumbnail: `${MOVIE_URL}${data.image.formats.thumbnail.url}`,
            movieId: data.id,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
        }),
    })
        .then((res) => checkResponse(res));
};

export const deleteCard = (cardId) => {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/movies/${cardId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => checkResponse(res));
};