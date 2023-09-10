import React from 'react';
import './Footer.css';

export default function Footer() {
	const setYear = () => {
		return new Date().getFullYear();
	};
	return (
		<footer className='footer'>
			<h3 className='footer__title'>Учебный проект Яндекс.Практикум x BeatFilm.</h3>
			<div className='footer__container'>
				<p className='footer__copyright'>&copy; {setYear()}</p>
				<nav>
					<ul className='footer__list'>
						<li>
							<a
								className='footer__link'
								href='https://practicum.yandex.ru'
								target='_blank'
								rel='noreferrer'>
								Яндекс.Практикум
							</a>
						</li>
						<li>
							<a
								className='footer__link'
								href='https://github.com/Tanniria'
								target='_blank'
								rel='noreferrer'>
								GitHub
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
}
