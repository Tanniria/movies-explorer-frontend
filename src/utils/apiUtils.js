export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL = 'https://api.movies-explorers.nomoredomains.xyz';
export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const responseConstructor = async (url, method, body, isAuth) => {
	const token = localStorage.getItem('token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...(isAuth && {Authorization: `Bearer ${token}`}),
	};
	const res = await fetch(`${url}`, {
		method: method,
		headers: headers,
		...(body && {body: body}),
	});
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Что-то пошло не так: ${res.status}`);
};
