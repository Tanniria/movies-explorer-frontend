export const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
 
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function getCards() {
  return fetch(MOVIE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}