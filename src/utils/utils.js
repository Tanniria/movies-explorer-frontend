import { SHORT_MOVIES } from '../utils/constants';

export default function movieDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч${minutes}м`;
}

export const searchMovies = (movies, keyword, checkbox) => {
    const moviesSearchКeyword = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
    })
    if (checkbox) {
        return filterShortMovies(moviesSearchКeyword);
    } else {
        return moviesSearchКeyword;
    }
};

// фильтрация по длительности фильма
export const filterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= SHORT_MOVIES);
};
