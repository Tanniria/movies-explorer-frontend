import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({movies, onSave, onDelete, isSaved, url}) {
	return (
		<section className='movies-cards'>
			<ul className='movies-cards__list'>
				{movies.length ? (
					movies.map((m) => (
						<MoviesCard
							key={m.id || m.movieId}
							movie={m}
							onSave={onSave}
							onDelete={onDelete}
							isSaved={isSaved}
							url={url}
						/>
					))
				) : (
					<p className='search-alert'>Ничего не найдено</p>
				)}
			</ul>
		</section>
	);
}
