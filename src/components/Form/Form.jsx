import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Form.css';

export default function Form({title, children, buttonText, linkText, route, link, onSubmit, isValid, errorMessage, isSendRequest}) {
	return (
		<div className='form'>
			<Link
				to='/'
				className='form__logo'>
				<img
					src={logo}
					alt='Логотип'
				/>
			</Link>
			<h2 className='form__title'>{title}</h2>
			<form
				className='form__container'
				onSubmit={onSubmit}>
				{children}
				<p className='form__text-error'>{errorMessage}</p>
				<button
					type='submit'
					className='form__submit-button'
					disabled={!isValid || isSendRequest}>
					{buttonText}
				</button>
			</form>
			<p className='form__text'>
				{linkText}
				<Link
					to={route}
					className='form__link'>
					{link}
				</Link>
			</p>
		</div>
	);
}
