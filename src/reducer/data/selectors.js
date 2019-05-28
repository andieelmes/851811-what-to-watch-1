import {createSelector} from "reselect";
import Namespace from "../namespaces";
import {
  ALL_GENRES
} from "movie-variables";

const NAMESPACE = Namespace.DATA;

export const getAllMovies = (state) => {
  return state[NAMESPACE].movies;
};

export const getGenre = (state) => {
  return state[NAMESPACE].genre;
};

export const getGenres = createSelector(
    getAllMovies,
    (movies) => [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))]
);


export const getMovies = createSelector(
    getGenre,
    getAllMovies,
    (genre, movies) => genre === ALL_GENRES ? movies : movies.filter((movie) => movie.genre === genre)
);
