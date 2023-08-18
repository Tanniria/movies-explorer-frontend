import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as api from '../../utils/MainApi';

import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import { RES_ERRORS, ERRORS } from '../../utils/constants';

import "./App.css";

export default function App() {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [error, setError] = useState('');


    function handleRegistration({ name, email, password }) {
        api
            .register({ name, email, password })
            .then(() => {
                handleLogin({ email, password });
            })
            .catch((err) => {
                if (err === 'Ошибка: 500') {
                    console.log(err)
                    setError('Ошибка на сервере');
                }
                if (err === 'Ошибка: 409') {
                    console.log(err);
                    setError('Пользователь с такой почтой уже существует');
                } else {
                    setError('Переданы некорректные данные пользователя');
                }
            })
            .finally(() => {
                setTimeout(() => setError(''), 3000);
            });
    };

    //авторизация пользователя
    function handleLogin(email, password) {
        api
            .login(email, password)
            .then((res) => {
                localStorage.setItem("jwt", res.token);
                setIsLoggedIn(true);
                navigate("/", { replace: true })
            })
            .catch((err) => {
                if (err === 'Ошибка: 401') {
                    console.log(err)
                    setError('Неправильно введен email или пароль');
                } else if (err) {
                    setError('Что-то пошло не так');
                } else {
                    setError('');
                }
            })
            .finally(() => {
                setTimeout(() => setError(''), 3000);
            });
    }
    // const handleUpdateUser = (data) => {
    //     setIsEditUserInfoStatus(true);
    //     const jwt = localStorage.getItem('jwt');
    //     api
    //         .editUserInfo(data, jwt)
    //         .then(() => {
    //             setCurrentUser(data);
    //             setIsEditUserInfoStatus(RES_ERRORS.UPDATE_SUCCESS);
    //             setTimeout(() => setIsEditUserInfoStatus(''), 2500);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             if (err === 'Ошибка: 409') {
    //                 setIsEditUserInfoStatus(RES_ERRORS.UPDATE_PROFILE);
    //             } else {
    //                 setIsEditUserInfoStatus(RES_ERRORS.UPDATE_DEFAULT_400);
    //             }
    //         })
    // };

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setSavedMovies((state) => state.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
                handleLogin(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route
                        path='/'
                        element={<Main isLoggedIn={isLoggedIn} />}
                    />
                    <Route
                        path="/movies"
                        element={<Movies />}
                    />
                    {/* <Route
                        path="/movies"
                        element={
                            <ProtectedRouteElement
                                element={Movies}
                                isLoggedIn={isLoggedIn}
                                savedMovies={savedMovies}

                            />}
                    /> */}
                    <Route
                        path="/saved-movies"
                        element={<SavedMovies isLoggedIn={isLoggedIn} />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile isLoggedIn={isLoggedIn} />}
                    />
                    <Route
                        path='/signup'
                        element={<Register isLoggedIn={isLoggedIn} />}
                    />
                    <Route
                        path='/signin'
                        element={<Login isLoggedIn={isLoggedIn} />}
                    />
                    <Route path='*' element={<PageNotFound />}></Route>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
}
