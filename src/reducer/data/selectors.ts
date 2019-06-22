import { createSelector } from "reselect";
import Namespace from "../namespaces";
import {
  ALL_GENRES,
  GENRES_T0_SHOW
} from "App/movie-variables";
import { Data, Movie } from 'App/types';

const NAMESPACE = Namespace.DATA;

export const getAllMovies = (state: Data) => {
  return state[NAMESPACE].movies;
};

export const getGenre = (state: Data) => {
  return state[NAMESPACE].genre;
};

export const getGenres = createSelector(
    getAllMovies,
    (movies) => [ALL_GENRES, ...new Set(movies.map((movie: Movie) => movie.genre))].slice(0, GENRES_T0_SHOW)
);

export const getMovies = createSelector(
    getGenre,
    getAllMovies,
    (genre, movies) => genre === ALL_GENRES ? movies : movies.filter((movie: Movie) => movie.genre === genre)
);

export const getFavorites = (state: Data) => {
  return state[NAMESPACE].favorites;
};

export const getReviews = (state: Data, id: number) => {
  return state[NAMESPACE].reviews[id];
};

export const getPromoMovie = (state: Data) => {
  if (!state[NAMESPACE].promoMovie) return false;
  const promoMovieId = state[NAMESPACE].promoMovie.id;
  const promoMovie = state[NAMESPACE].movies.find((movie) => movie.id === promoMovieId)
  return promoMovie;
};
