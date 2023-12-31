import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {
	const [isLoaded, setIsLoaded] = useState(false);
	const navigate = useNavigate();

	setTimeout(() => {
		setIsLoaded(true);
	}, 1000);

	return (
		<main>
			{isLoaded && (
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
