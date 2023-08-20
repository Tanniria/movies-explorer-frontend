import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { register, login, getUserInfo } from "../../utils/Auth";
import { editUserInfo, getSavedMovies, postMovieCards, deleteCard } from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import { searchMovies, filterShortMovies } from "../../utils/utils";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import useResize from "../../hooks/useResize";
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  // const width = useResize();
  // юзер
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState('');
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  // ошибки
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [isNotFoundSaved, setIsNotFoundSaved] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  // фильмы
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [bdMovies, setBdMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  // сохраненные фильмы
  const [isSavedMovies, setIsSavedMovies] = useState([]);
  const [listMovies, setListMovies] = useState(isSavedMovies);
  const [isFilterSavedMovies, setIsFilterSavedMovies] = useState(listMovies);

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [isShortMoviesSaved, setIsShortMoviesSaved] = useState(false);

  const [checkbox, setCheckbox] = useState(false)
  // Авторизация, регистрация, проверка токена, изменение профиля
  useEffect(() => {
    if (!isLoggedIn) handleTokenCheck();
  }, [isLoggedIn]);

  function handleTokenCheck() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setIsTokenChecked(true);
      return;
    }
    getUserInfo(token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      })
      .finally(() => setIsTokenChecked(true));
    getSavedMovies(token)
      .then((data) => {
        setIsLoggedIn(true);
        setListMovies(data);
        setIsSavedMovies(data);
        setIsFilterSavedMovies(data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
  };

  const handleRegistration = ({ name, email, password }) => {
    register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          setIsError('На сервере произошла ошибка');
        }
        if (err === 'Ошибка: 409') {
          setIsError('Пользователь с таким email уже существует');
        } else {
          setIsError('Переданы некорректные данные')
        }
      })
      .finally(() => {
        setTimeout(() => setIsError(''), 5000);
      });
  };

  function handleAuthorization({ email, password }) {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          handleTokenCheck();
          setIsLoggedIn(true);
          navigate('/movies');
        }
        Promise.all([getUserInfo()], [getMovies()])
          .then(([userData, moviesData]) => {
            console.log(userData);
            console.log(moviesData);
            setCurrentUser(userData);
            // localStorage.setItem('movies', JSON.stringify(moviesData));
            // setIsAllMovies(JSON.parse(localStorage.getItem('movies')));
          });
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          setIsError('На сервере произошла ошибка');
        }
        if (err === 'Ошибка: 401') {
          setIsError('Вы ввели неправильный email или пароль');
        } else {
          setIsError('Что-то пошло не так...')
        }
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        setCurrentUser(null);
      })
      .finally(() => {
        setTimeout(() => setIsError(''), 5000);
      })
  };

  function handleUpdateUser(data) {
    const token = localStorage.getItem('jwt');
    setIsEditProfile(true);
    editUserInfo(data, token)
      .then(() => {
        setCurrentUser(data);
        setIsEditProfile('Данные успешно обновлены!');
        setTimeout(() => setIsEditProfile(''), 3000);
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 409') {
          setIsEditProfile('Пользователь с таким email уже существует');
        } else {
          setIsEditProfile('При обновлении профиля произошла ошибка');
        }
      });
  };

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    handleTokenCheck(null);
    setIsLoading(false);
    setBdMovies([]);
    setIsSavedMovies([]);
    setFoundMovies(false);
    setIsShortMovies(false);
    setKeyWord('');
    setFoundMovies([]);
    setCurrentUser({});
    setIsTokenChecked(false);
    setIsNotFoundSaved(false);
    setIsNotFound(false);

    // переадресация на главную страницу
    navigate('/');
  }

  //  Функционал, связанный с фильмами

  useEffect(() => {
    setKeyWord(localStorage.getItem('searchKeyword' || ''));
    setIsShortMovies(
      localStorage.getItem('isShortMovies' || '') === 'true'
    );
    if (localStorage.getItem('foundMovies')) {
      const movies = JSON.parse(localStorage.getItem('foundMovies'));
      setBdMovies(movies);
      if (movies.length === 0) {
        setIsNotFound(true);
      }
      if (localStorage.getItem('isShortMovies') === 'true') {
        setIsFilterSavedMovies(filterShortMovies(movies));
      } else {
        setIsFilterSavedMovies(movies);
      }
    }
  }, []);

  // Меняем состояние чекбокса на короткометражки
  const handleChangeCheckbox = () => {
    setIsShortMovies(!isShortMovies);
    console.log(isShortMovies);
    if (!isShortMovies) {
      const filteredShortMovies = filterShortMovies(bdMovies);
      setFoundMovies(filteredShortMovies);
      if (filteredShortMovies.length === 0) {
        setIsNotFound(true);
      }
    } else {
      setFoundMovies(bdMovies);
      if (bdMovies.length > 0) {
        setIsNotFound(false);
      }
    }
    localStorage.setItem('isShortMovies', !isShortMovies);
  };

  // обработчик поискового запроса по критериям
  const handleSetFilterMovies = (movies, keyword, checkbox) => {
    setIsLoading(true);
    const moviesList = searchMovies(movies, keyword, false);
    moviesList.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    setBdMovies(moviesList);
    setFoundMovies(checkbox ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('foundMovies', JSON.stringify(moviesList));
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Обработаем запрос пользователя по поиску фильмов
  const handleRequestMovies = (keyword) => {
    localStorage.setItem('searchKeyword', keyword); // Записываем в сторедж введенное ключевое слово
    localStorage.setItem('isShortMovies', isShortMovies); // Записываем в сторедж выставленное положение флажка
    if (isAllMovies.length === 0) {
      // если фильмов в сторедж нет, сделаем запрос к BeatfilmMoviesApi
      setIsLoading(true);
      getMovies()
        .then((movies) => {
          setIsLoading(true);
          localStorage.setItem('isAllMovies', JSON.stringify(movies)); // Записываем в сторедж все полученные фильмы с BeatfilmMoviesApi
          setIsAllMovies(movies);
          handleSetFilterMovies(movies, keyword, isShortMovies); // Находим фильмы по запросу и выставленным критериям
        })
        .catch((err) => {
          setIsServerError(true);
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000);
        });
    } else {
      handleSetFilterMovies(isAllMovies, keyword, isShortMovies);
    }
  };
  // Сохраненные фильмы

  useEffect(() => {
    if (isSavedMovies.length === 0) return;
    if (foundMovies.length === 0) {
      setIsError('Результаты не найдены');
    } else {
      setIsError('');
    }
  }, [foundMovies, isSavedMovies, keyWord]);


  // Отслеживаем состояние стэйта чекбокса
  useEffect(() => {
    if (localStorage.getItem('isShortMoviesSaved') === 'true') {
      setIsShortMoviesSaved(true);
      setListMovies(filterShortMovies(isSavedMovies))
    } else {
      setIsShortMoviesSaved(false);
      setListMovies(isSavedMovies);
    }
  }, [isSavedMovies]);

  // Меняем состояние чекбокса на короткометражки
  const handleChangeCheckboxSavedMovies = () => {
    setIsShortMoviesSaved(!isShortMoviesSaved);
    if (!isShortMoviesSaved) {
      localStorage.setItem('isShortMoviesSaved', true);
      setIsShortMoviesSaved(true);
      setListMovies(filterShortMovies(isFilterSavedMovies));
      if (filterShortMovies(isFilterSavedMovies).length === 0) {
        setIsNotFoundSaved(true);
      }
      setIsNotFoundSaved(false);
    } else {
      setIsShortMoviesSaved(false);
      localStorage.setItem('isShortMoviesSaved', false);
      if (isFilterSavedMovies.length === 0) {
        setIsNotFoundSaved(true);
        setListMovies(isFilterSavedMovies);
      }
      setIsNotFoundSaved(false);
      setListMovies(isFilterSavedMovies);
    }
  };

  // Поиск среди сохранённых фильмов
  const handleSearchSavedMovies = (keyword) => {
    console.log(isSavedMovies);
    const foundSavedMovies = searchMovies(
      isSavedMovies,
      keyword,
      isShortMoviesSaved
    );
    if (foundSavedMovies.length === 0) {
      setIsNotFoundSaved(true);
      setListMovies(foundSavedMovies);
      setIsFilterSavedMovies(foundSavedMovies);
    } else {
      setIsNotFoundSaved(false);
      setIsFilterSavedMovies(foundSavedMovies);
      setListMovies(foundSavedMovies);
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsShortMoviesSaved(false);
      setListMovies(isSavedMovies);
    }
  }, [location]);

  // Лайки, удаление
  function checkMovieLike(movie) {
    return isSavedMovies.some((item) => item.movieId === movie.id);
  };

  function handleLike(movie) {
    const token = localStorage.getItem('jwt');
    postMovieCards(movie, token)
      .then((newMovieCard) => {
        setIsSavedMovies([...isSavedMovies, newMovieCard]);
        setIsFilterSavedMovies([...isSavedMovies, newMovieCard]);
      })
      .catch((err) => {
        console.log('Ошибка при создании карточки', err);
      })
  }

  function handleDelete(movie) {
    const token = localStorage.getItem('jwt');
    const deleteMovieCard = isSavedMovies.find((card) =>
      card.movieId === (movie.id || movie.movieId)
    )
    if (!deleteMovieCard) return;
    deleteCard(deleteMovieCard._id, token)
      .then(() => {
        setIsSavedMovies(isSavedMovies.filter((card) =>
          card._id !== deleteMovieCard._id));
        setIsFilterSavedMovies(isSavedMovies.filter((card) =>
          card._id !== deleteMovieCard._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path='/'
            element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path='/signup'
            element={<Register
              isLoggedIn={isLoggedIn}
              isTokenChecked={isTokenChecked}
              onRegister={handleRegistration} />
            }
          />
          <Route
            path='/signin'
            element={<Login
              isLoggedIn={isLoggedIn}
              isTokenChecked={isTokenChecked}
              onLogin={handleAuthorization} />
            }
          />
          {/* <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                element={Movies}
                isLoggedIn={isLoggedIn}
                isTokenChecked={isTokenChecked}
                isLoading={isLoading}
                movies={foundMovies}
                savedMovies={isSavedMovies}
                checked={isShortMovies}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                isTokenChecked={isTokenChecked}
                movies={listMovies}
                savedMovies={isSavedMovies}
                checked={isShortMoviesSaved}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRouteElement
                element={Profile}
                isLoggedIn={isLoggedIn}
                isTokenChecked={isTokenChecked}
                isEditProfile={isEditProfile}
                onEditUser={handleUpdateUser}
                signOut={handleSignOut}
                onLike={handleLike}
                checkMovieLike={checkMovieLike}
              />
            }
          /> */}

          <Route path="/movies"
            element={<Movies
              isLoggedIn={isLoggedIn}
              isTokenChecked={isTokenChecked}
              isLoadind={isLoading}
              movies={foundMovies}
              checked={isShortMovies}
              isServerError={isServerError}
              isNotFound={isNotFound}
              savedMovies={isSavedMovies}
              onLike={handleLike}
              onCheckbox={handleChangeCheckbox}
              checkMovieLike={checkMovieLike}
              onDelete={handleDelete}
              onSubmit={handleRequestMovies}
            />} />
          <Route path="/saved-movies"
            element={<SavedMovies
              isLoggedIn={isLoggedIn}
              isTokenChecked={isTokenChecked}
              movies={listMovies}
              savedMovies={isSavedMovies}
              isNotFound={isNotFoundSaved}
              checked={isShortMoviesSaved}
              checkMovieLike={checkMovieLike}
              onSubmit={handleSearchSavedMovies}
              onCheckbox={handleChangeCheckboxSavedMovies}
              onDelete={handleDelete}
            />} />
          <Route path="/profile"
            element={<Profile
              isLoggedIn={isLoggedIn}
              onEditUser={handleUpdateUser}
              signOut={handleSignOut}
              isEditProfile={isEditProfile} />} />

          <Route
            path='*'
            element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};