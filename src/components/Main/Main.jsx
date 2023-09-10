import React, {useContext} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

export default function Main() {
	const {user} = useContext(CurrentUserContext);
	return (
		<>
			{user.isAuth ? <HeaderMovies /> : <Header />}
			<main className='main'>
				<Promo />
				<AboutProject />
				<Techs />
				<AboutMe />
				<Portfolio />
			</main>
			<Footer />
		</>
	);
}
