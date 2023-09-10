import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
	return (
		<section
			className='about-project'
			id='project'>
			<h2 className='about-project__title'>О проекте</h2>
			<ul className='about-project__container'>
				<li>
					<div className='about-project__info'>
						<h3 className='about-project__info-title'>Дипломный проект включал 5 этапов</h3>
						<p className='about-project__info-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
					</div>
				</li>
				<li>
					<div className='about-project__info'>
						<h3 className='about-project__info-title'>На выполнение диплома ушло 5 недель</h3>
						<p className='about-project__info-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
					</div>
				</li>
			</ul>
			<div className='about-project__diplom'>
				<h3 className='about-project__diplom-title about-project__diplom-title_black'>1 неделя</h3>
				<h3 className='about-project__diplom-title'>4 недели</h3>
				<p className='about-project__diplom-info'>Back-end</p>
				<p className='about-project__diplom-info'>Front-end</p>
			</div>
		</section>
	);
}
