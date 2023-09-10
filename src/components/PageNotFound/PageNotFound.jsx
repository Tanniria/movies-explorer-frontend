import React, {useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import './PageNotFound.css';

export default function PageNotFound() {
	const navigate = useNavigate();
	const {user} = useContext(CurrentUserContext);

	useEffect(() => {
		if (!user.isAuth && user.isTokenChecked) navigate('/');
	}, [navigate, user.isAuth, user.isTokenChecked]);

	return (
		<main>
			{!user.isAuth ? (
				''
			) : (
				<section className='pageNotFound'>
					<div className='pageNotFound__container'>
						<div className='pageNotFound__text'>
							<h2 className='pageNotFound__title'>404</h2>
							<h3 className='pageNotFound__subtitle'>Страница не найдена</h3>
						</div>
						<button
							className='pageNotFound__button'
							onClick={() => navigate(-1)}>
							Назад
						</button>
					</div>
				</section>
			)}
		</main>
	);
}
