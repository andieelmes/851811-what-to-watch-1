import {createSelector} from "reselect";
import NameSpace from "../name-spaces";
import {
  ALL_GENRES
} from "movie-variables";

const NAME_SPACE = NameSpace.DATA;

export const getAllMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
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
