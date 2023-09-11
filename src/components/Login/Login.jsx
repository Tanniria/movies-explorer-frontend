import React, {useEffect} from 'react';
import {useFormValidation} from '../../hooks/useValidation';
import Form from '../Form/Form';
import '../Form/Form.css';

export default function Login({onLogin, errorMessage, isSendRequest}) {
	const {values, handleChange, errors, isValid, setValues} = useFormValidation();
	useEffect(() => {
		setValues({
			email: '',
			password: '',
		});
	}, [setValues]);

	function handleSubmit(evt) {
		evt.preventDefault();
		onLogin({
			email: values.email,
			password: values.password,
		});
	}
	return (
		<main>
			<section className='login'>
				<Form
					title='Рады видеть!'
					buttonText='Войти'
					linkText='Еще не зарегистрированы?'
					link='Регистрация'
					route='/signup'
					onSubmit={handleSubmit}
					isValid={isValid}
					errorMessage={errorMessage}
					isSendRequest={isSendRequest}>
					<label className='form__wrapper'>
						E-mail
						<input
							className='form__input'
							name='email'
							type='email'
							placeholder='Ваш e-mail'
							required
							onChange={(e) => handleChange(e)}
							value={values.email || ''}
						/>
						<span className='form__input-error'>{errors.email}</span>
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
							value={values.password || ''}
						/>
						<span className='form__input-error'>{errors.password}</span>
					</label>
				</Form>
			</section>
		</main>
	);
}
