import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getUserInfo, login, register } from '../../utils/Auth';

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
  // const navigate = useNavigate();
  // const location = useLocation();
  // const width = useResize();

  // const [currentUser, setCurrentUser] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isTokenChecked, setIsTokenChecked] = useState(false);
  // const [savedMovies, setSavedMovies] = useState([]);
  // const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) handleTokenCheck();
  }, [isLoggedIn]);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsTokenChecked(true);
      return;
    }
  };
  const handleRegistration = ({ name, email, password }) => {
    register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => console.log(err, 'err'))
      .finally(() => {
        setTimeout(() => console.log(''), 3000);
      });
  };

  const handleAuthorization = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          localStorage.setItem('jwt', res.token); // токен хранится в localstorage
          handleTokenCheck();
          navigate('/movies'); // автоматическая переадресация на страницу movies
        }
        Promise.all([getUserInfo]).then(([userInfo, userMovies]) => {
          console.log(userInfo);
          //    console.log(userMovies);
          setCurrentUser(userInfo); // данные записываются в глобальную стейт-переменную
          //    localStorage.setItem('movies', JSON.stringify(userMovies));
          //    setAllMovies(JSON.parse(localStorage.getItem('movies')));
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        setCurrentUser(null);
      });
  };
  // function onSignOut() {
  //     localStorage.clear(); 
  //     setIsLoggedIn(false);
  //     // handleTokenCheck(null);
  //     // setIsLoading(false);
  //     // setListFoundMovies([]);
  //     // setSavedMovies([]);
  //     // setFoundMoviesList(false);
  //     // setShortMovieCheckbox(false);
  //     // setSearchKeyword('');
  //     // setFoundMoviesList([]);
  //     // setCurrentUser({});
  //     // setIsTokenChecked(false);
  //     // setIsNotFoundSaved(false);
  //     // setIsNotFound(false);
  //     // переадресация на главную страницу
  //     navigate('/');
  // }
  return (
    // <CurrentUserContext.Provider value={currentUser}>
    //   <div className="page">
    //     <Routes>
    //       <Route
    //         path='/'
    //         element={<Main isLoggedIn={isLoggedIn} />}
    //       />
    //       <Route
    //         path="/movies"
    //         element={<Movies  />}
    //       />
    //       {/* <Route
    //                     path="/movies"
    //                     element={
    //                         <ProtectedRouteElement
    //                             element={Movies}
    //                             isLoggedIn={isLoggedIn}
    //                             savedMovies={savedMovies}

    //                         />}
    //                 /> */}
    //       <Route
    //         path="/saved-movies"
    //         element={<SavedMovies isLoggedIn={isLoggedIn} />}
    //       />
    //       <Route
    //         path="/profile"
    //         element={<Profile isLoggedIn={isLoggedIn}  />}
    //       />
    //       <Route
    //         path="/signup"
    //         element={<Register isLoggedIn={isLoggedIn} onRegister={handleRegistration} />}
    //       />
    //       <Route
    //         path='/signin'
    //         element={<Login isLoggedIn={isLoggedIn} onLogin={handleAuthorization}/>}
    //       />
    //       <Route path='*' element={<PageNotFound />}></Route>
    //     </Routes>
    //   </div>
    // </CurrentUserContext.Provider>
    <div className="page">
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
        <Route
          path="/signup"
          element={<Register isLoggedIn={isLoggedIn} onRegister={handleRegistration} />}
        />
        <Route path="/signin" element={<Login isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  )
}