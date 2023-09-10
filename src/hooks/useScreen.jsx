import { useEffect, useState } from 'react';

export const useScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [moviesList, setMoviesList] = useState({
    quantityMovies: 12,
    moviesToAdd: 6,
  });
  useEffect(() => {
    const screenResize = (e) => {
      setWidth(e.target.innerWidth);
    };
    window.addEventListener('resize', screenResize);
    return () => window.removeEventListener('resize', screenResize);
  }, []);
  const handleAddBtn = () => {
    setMoviesList((prev) => ({ ...prev, quantityMovies: prev.quantityMovies + prev.moviesToAdd }));
  };
  useGetWidth(width, setMoviesList);
  return [moviesList, handleAddBtn];
};
const useGetWidth = (width, setMoviesList) => {
  useEffect(() => {
    if (width > 1280) {
      setMoviesList((prev) => ({ ...prev, moviesToAdd: 6 }));
    }
    if (width < 1150 && width >= 560) {
      setMoviesList((prev) => ({ ...prev, moviesToAdd: 4 }));
    }
    if (width < 480) {
      setMoviesList((prev) => ({ ...prev, moviesToAdd: 2 }));
    }
  }, [width, setMoviesList]);
};