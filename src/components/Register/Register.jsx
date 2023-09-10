import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';
import '../Form/Form.css';

export default function Register({onRegister, errorMessage}) {
	const {user} = useContext(CurrentUserContext);
	const navigate = useNavigate();
	if (user.isAuth) navigate('/');
	const [registrationUserInfo, setRegistrationUserInfo] = useState({
		name: '',
		email: '',
		password: '',
	});

	function handleChange(evt) {
		const {value, name} = evt.target;
		setRegistrationUserInfo({...registrationUserInfo, [name]: value});
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		onRegister(registrationUserInfo);
	}

	return (
		<main>
			<section className='register'>
				<Form
					title='Добро пожаловать!'
					buttonText='Зарегистрироваться'
					linkText='Уже зарегистрированы?'
					link='Войти'
					route='/signin'
					onSubmit={handleSubmit}>
					<label className='form__wrapper'>
						Имя
						<input
							className='form__input'
							name='name'
							type='text'
							placeholder='Ваше имя'
							minLength='2'
							maxLength='40'
							required
							onChange={handleChange}
							value={registrationUserInfo.name}
						/>
						<span className='form__input-error'></span>
					</label>
					<label className='form__wrapper'>
						E-mail
						<input
							className='form__input'
							name='email'
							type='email'
							placeholder='Ваш e-mail'
							required
							onChange={handleChange}
							value={registrationUserInfo.email}
						/>
						<span className='form__input-error'>{errorMessage}</span>
					</label>
					<label className='form__wrapper'>
						Пароль
						<input
							className='form__input'
							name='password'
							type='password'
							placeholder='Введите пароль'
							minLength='8'
							maxLength='40'
							required
							onChange={handleChange}
							value={registrationUserInfo.password}
						/>
						<span className='form__input-error'></span>
					</label>
				</Form>
			</section>
		</main>
	);
}
