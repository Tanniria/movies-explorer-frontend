import {Link} from 'react-router-dom';
import {timeConverter} from '../../utils/utils';
import './MoviesCard.css';

export default function MoviesCard({movie, onSave, onDelete, isSaved, url}) {
	const isSavedMovie = isSaved(movie);

	const handleSave = (movie) => {
		if (!isSavedMovie) {
			onSave(movie);
		} else {
			console.log('Фильм уже сохранён');
		}
	};

	return (
		<li className='movie-card'>
			<Link
				to={movie.trailerLink}
				className='movie-card__link'
				target='_blank'>
				<img
					className='movie-card__image'
					src={movie && (url === 'savedMovies' ? `${movie?.image}` : `https://api.nomoreparties.co/${movie?.image.url}`)}
					alt='постер к фильму'
				/>
			</Link>
			{url === 'allMovies' && (
				<button
					className={`movie-card__button movie-card__button_type_save ${isSavedMovie ? 'movie-card__button movie-card__button_type_saved' : ''}`}
					type='button'
					onClick={!isSavedMovie ? () => handleSave(movie) : () => onDelete(movie)}>
					{isSavedMovie ? '' : 'Сохранить'}
				</button>
			)}
			{url === 'savedMovies' && (
				<button
					className='movie-card__button movie-card__button_type_delete'
					type='button'
					onClick={() => onDelete(movie)}></button>
			)}

			<div className='movie-card__info'>
				<h2 className='movie-card__title'>{movie.nameRU || movie.nameEN}</h2>
				<p className='movie-card__duration'>{timeConverter(movie.duration)}</p>
			</div>
		</li>
	);
}
