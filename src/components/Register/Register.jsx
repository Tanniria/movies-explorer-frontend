import React, {useEffect} from 'react';
import {useFormValidation} from '../../hooks/useValidation';
import Form from '../Form/Form';
import '../Form/Form.css';

export default function Register({onRegister, errorMessage, isSendRequest}) {
	const {values, handleChange, errors, isValid, setValues} = useFormValidation();
	useEffect(() => {
		setValues({
			name: '',
			email: '',
			password: '',
		});
	}, [setValues]);

	function handleSubmit(evt) {
		evt.preventDefault();
		onRegister(values);
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
					onSubmit={handleSubmit}
					errorMessage={errorMessage}
					isValid={isValid}
					isSendRequest={isSendRequest}>
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
							onChange={(e) => handleChange(e)}
							value={values.name ? values.name : ''}
						/>
						{values.name && <span className='form__input-error'>{errors.name}</span>}
					</label>
					<label className='form__wrapper'>
						E-mail
						<input
							className='form__input'
							name='email'
							type='email'
							placeholder='Ваш e-mail'
							required
							onChange={(e) => handleChange(e)}
							value={values.email ? values.email : ''}
						/>
						{values.email && <span className='form__input-error'>{errors.email}</span>}
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
							onChange={(e) => handleChange(e)}
							value={values.password ? values.password : ''}
						/>
						{values.password && <span className='form__input-error'>{errors.password}</span>}
					</label>
				</Form>
			</section>
		</main>
	);
}
