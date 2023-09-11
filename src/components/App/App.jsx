import React, {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import {getUser, editUser, login, register} from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {RES_ERRORS} from '../../utils/constans';
import './App.css';

export default function App() {
	const [user, setUser] = useState({
		isAuth: false,
		currentUser: {},
		isEditUserInfo: '',
		isTokenChecked: false,
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [isSendRequest, setSendRequest] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const tokenCheck = async () => {
			try {
				if (!token) {
					setUser({
						isAuth: false,
						currentUser: {},
						isEditUserInfo: '',
						isTokenChecked: true,
					});
					localStorage.removeItem('token');
					localStorage.removeItem('allMovies');
					localStorage.removeItem('savedMovies');
					return;
				}
				await getUser().then((data) => {
					if (data) {
						setUser((prev) => ({
							...prev,
							isAuth: true,
							currentUser: data,
							isTokenChecked: false,
						}));
					} else {
					}
				});
			} catch (error) {
				setUser((prev) => ({
					...prev,
					isAuth: false,
					currentUser: {},
					isTokenChecked: true,
				}));
			}
		};
		tokenCheck();
	}, [user.isTokenChecked, navigate]);

	const handleRegistration = ({name, email, password}) => {
		setSendRequest(true);
		register(name, email, password)
			.then(() => {
				handleLogin({email, password});
			})
			.catch((error) => {
				if (error === 'Что-то пошло не так: 500') {
					setErrorMessage(RES_ERRORS.SERVER_500);
				}
				if (error === 'Что-то пошло не так: 409') {
					setErrorMessage(RES_ERRORS.REGISTRATION_409);
				} else {
					setErrorMessage(RES_ERRORS.REGISTRATION_DEFAULT);
				}
			})
			.finally(() => {
				setTimeout(() => setErrorMessage(''), 3000);
				setTimeout(() => setSendRequest(false), 500);
			});
	};
	const handleLogin = ({email, password}) => {
		setSendRequest(true);
		login(email, password)
			.then((res) => {
				localStorage.setItem('token', res.token);
				if (!errorMessage) {
					navigate('/movies');
				}
			})
			.catch((error) => {
				if (error === 'Что-то пошло не так: 500') {
					setErrorMessage(RES_ERRORS.SERVER_500);
				} else {
					setErrorMessage(RES_ERRORS.AUTHORIZATION_DEFAULT);
				}
				setUser({...user, isAuth: false});
				localStorage.removeItem('token');
			})
			.finally(() => {
				setTimeout(() => setErrorMessage(''), 3000);
				setTimeout(() => setSendRequest(false), 500);
			});
	};

	const handleUserEdit = (data) => {
		setUser({...user, isEditUserInfo: true});
		try {
			editUser(data).then(() => {
				setUser((prev) => ({
					...prev,
					currentUser: data,
					isEditUserInfo: RES_ERRORS.UPDATE_SUCCESS,
				}));
				setTimeout(() => setUser((prev) => ({...prev, isEditUserInfo: ''})), 2500);
			});
		} catch (error) {
			if (error === 'Что-то пошло не так: 409') {
				setUser({...user, currentUser: data, isEditUserInfo: RES_ERRORS.UPDATE_PROFILE});
			} else {
				setUser({...user, currentUser: data, isEditUserInfo: RES_ERRORS.UPDATE_DEFAULT_400});
			}
		}
	};

	const logOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('allMovies');
		localStorage.removeItem('savedMovies');
		setUser({
			isAuth: false,
			currentUser: {},
			isEditUserInfo: '',
			isTokenChecked: true,
		});
		navigate('/');
	};

	return (
		<CurrentUserContext.Provider value={{user, setUser}}>
			<div className='page'>
				<Routes>
					<Route
						path='/'
						element={<Main />}
					/>
					<Route
						path='/signup'
						element={
							<Register
								onRegister={handleRegistration}
								errorMessage={errorMessage}
								isSendRequest={isSendRequest}
							/>
						}
					/>
					<Route
						path='/signin'
						element={
							<Login
								onLogin={handleLogin}
								errorMessage={errorMessage}
								isSendRequest={isSendRequest}
							/>
						}
					/>
					{user.isAuth && (
						<Route element={<ProtectedRoute />}>
							<Route
								path='/profile'
								element={
									<Profile
										onEditUser={handleUserEdit}
										logOut={logOut}
										isSendRequest={isSendRequest}
									/>
								}
							/>
							<Route
								path='/movies'
								element={<Movies />}
							/>
							<Route
								path='/saved-movies'
								element={<Movies />}
							/>
						</Route>
					)}
					<Route
						path='*'
						element={<PageNotFound />}
					/>
				</Routes>
			</div>
		</CurrentUserContext.Provider>
	);
}
