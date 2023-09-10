import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import icon from "../../images/search.svg";
import "./SearchForm.css";

export default function SearchForm({ data, setMovies, url }) {
    const { isChecked, query } = data;
    const [values, setValues] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (url) {
            setIsLoading(false);
        }
        if (query) {
            setValues(query);
        } else {
            setValues('');
        }
    }, [query, url]);

    useEffect(() => {
        if (!isLoading && !values) {
            handleReset();
        }
    }, [values]);

    const filterAndSearch = () => {
        const obj = JSON.parse(localStorage.getItem(url));
        let result;
        if (obj.isChecked && !obj.query) {
            result = data.movies.filter((m) => m.duration < 40);
            localStorage.setItem(
                url,
                JSON.stringify({
                    ...obj,
                    searchedMovies: result,
                })
            );
            setMovies({ ...data, ...obj, searchedMovies: result });
        } else if (obj.query && !obj.isChecked) {
            result = data.movies.filter(
                (m) =>
                    m.nameRU.toLowerCase().includes(obj.query.toLowerCase()) ||
                    m.nameEN.toLowerCase().includes(obj.query.toLowerCase())
            );
            localStorage.setItem(
                url,
                JSON.stringify({
                    ...obj,
                    searchedMovies: result,
                })
            );
            setMovies({ ...data, ...obj, searchedMovies: result });
        } else if (obj.isChecked && obj.query) {
            result = data.movies
                .filter(
                    (m) =>
                        m.nameRU.toLowerCase().includes(obj.query.toLowerCase()) ||
                        m.nameEN.toLowerCase().includes(obj.query.toLowerCase())
                )
                .filter((m) => m.duration < 40);
            localStorage.setItem(
                url,
                JSON.stringify({
                    ...obj,
                    searchedMovies: result,
                })
            );
            setMovies({
                ...data,
                ...obj,
                searchedMovies: result,
            });
        }
    };

    const handleChange = (e, type) => {
        let result;
        const { movies, ...store } = data;
        if (type === 'checkbox') {
            setMovies((prev) => ({ ...prev, isChecked: !isChecked }));
            result = { ...store, isChecked: !isChecked };
            localStorage.setItem(url, JSON.stringify(result));
            filterAndSearch();
        }
        if (type === 'submit') {
            e.preventDefault();
            setMovies((prev) => ({ ...prev, query: values }));
            result = { ...store, query: values };
            localStorage.setItem(url, JSON.stringify(result));
            filterAndSearch();
        }
    };

    const handleReset = () => {
        let result;
        const { movies, ...store } = data;
        setMovies({ ...data, query: '' });
        result = { ...store, query: '' };
        setValues('');
        localStorage.setItem(url, JSON.stringify(result));
        filterAndSearch();
    };

    return (
        <section className="search-form">
            <form className="search-form__wrapper" onSubmit={(e) => handleChange(e, 'submit')}>
                <div className="search-form__input-container">
                    <img className="search-form__icon" src={icon} alt="Поиск" />
                    <input
                        className="search-form__input"
                        name="films"
                        type="text"
                        placeholder="Фильм"
                        value={values}
                        onChange={(e) => setValues(() => e.target.value)}
                        required
                    />
                    <button className="search-form__button" type="submit">
                        Найти
                    </button>
                </div>
                <FilterCheckbox onCheckbox={handleChange} isChecked={isChecked} />
            </form>
            <div className="search-form__border"></div>
        </section>
    );
}