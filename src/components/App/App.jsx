import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
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
    );
};
