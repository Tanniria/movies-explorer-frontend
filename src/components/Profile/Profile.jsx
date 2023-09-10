import React, {useState, useContext, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {useFormValidation} from '../../hooks/useValidation';
import HeaderMovies from '../Header/HeaderMovies/HeaderMovies';
import './Profile.css';

export default function Profile({logOut, onEditUser}) {
	const {user} = useContext(CurrentUserContext);
	const {values, handleChange, errors, isValid, setValues, resetForm} = useFormValidation();
	const [isInputDisabled, setIsInputDisables] = useState(true);
	const [isSuccess, setIsSuccess] = useState();
	const {name, email} = user.currentUser;
	useEffect(() => {
		setValues({
			name: name,
			email: email,
		});
	}, [email, name, setValues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onEditUser({
			name: values.name ? values.name : name,
			email: values.email ? values.email : email,
		});
		setIsInputDisables(true);
		setIsSuccess(false);
		resetForm();
	};

	const handleEdit = () => {
		setIsSuccess(true);
		setIsInputDisables(false);
	};

	return (
		<>
			<HeaderMovies />
			<main>
				<section className='profile'>
					<h3 className='profile__title'>Привет, {name}!</h3>
					<form
						className='profile__form'
						noValidate
						onSubmit={handleSubmit}>
						<label className='profile__label'>
							Имя
							<input
								className='profile__input'
								name='name'
								type='text'
								value={values?.name ?? name}
								disabled={isInputDisabled}
								onChange={(evt) => handleChange(evt)}
								minLength='2'
								maxLength='30'
								required
							/>
						</label>
						<span className='profile__input_error'>{errors.name}</span>
						<div className='profile__line'></div>
						<label className='profile__label'>
							Email
							<input
								className='profile__input'
								name='email'
								type='email'
								value={values?.email ?? email}
								disabled={isInputDisabled}
								onChange={handleChange}
								required
							/>
						</label>
						<span className='profile__input_error'>{errors.email}</span>
						<p className='profile__input_success'>{user.isEditUserInfo}</p>
						{isSuccess ? (
							<button
								className='profile__button profile__button_edit'
								type='button'
								onClick={handleSubmit}
								disabled={!isValid}>
								Сохранить
							</button>
						) : (
							<button
								className='profile__button profile__button_edit'
								type='button'
								onClick={handleEdit}>
								Редактировать
							</button>
						)}

						<button
							className='profile__button profile__button_signout'
							type='button'
							onClick={logOut}>
							Выйти из аккаунта
						</button>
					</form>
				</section>
			</main>
		</>
	);
}
