import {createSelector} from "reselect";
import Namespace from "../namespaces";
import {
  ALL_GENRES
} from "App/movie-variables";
import {Data, Movie} from 'App/types';

const NAMESPACE = Namespace.DATA;

export const getAllMovies = (state: Data) => {
  return state[NAMESPACE].movies;
};

export const getGenre = (state: Data) => {
  return state[NAMESPACE].genre;
};

export const getGenres = createSelector(
    getAllMovies,
    (movies) => [ALL_GENRES, ...new Set(movies.map((movie: Movie) => movie.genre))].slice(0, 10)
);


export const getMovies = createSelector(
    getGenre,
    getAllMovies,
    (genre, movies) => genre === ALL_GENRES ? movies : movies.filter((movie: Movie) => movie.genre === genre)
);

export const getFavorites = (state: Data) => {
  return state[NAMESPACE].favorites;
};
