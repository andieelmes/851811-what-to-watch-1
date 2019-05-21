import {MOVIES} from 'mocks/movies';

import {
  ALL_GENRES
} from "consts";

const initialState = {
  genre: ALL_GENRES,
  movies: MOVIES,
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: `CHANGE_GENRE`,
    payload: genre,
  }),

  getMovies: (genre, movies) => {
    if (genre === ALL_GENRES) {
      return {
        type: `ALL_MOVIES`,
        payload: movies,
      };
    }

    return {
      type: `GET_MOVIES`,
      payload: MOVIES.filter((movie) => movie.genre === genre),
    };
  },
};


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_GENRE`: return {...state, genre: action.payload}
    case `GET_MOVIES`: return {...state, movies: action.payload}
    case `ALL_MOVIES`: return initialState
  }

  return state;
};
