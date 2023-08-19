import { MOVIE_URL, checkResponse } from "./constants";

export function getMovies() {
  return fetch(`${MOVIE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
};