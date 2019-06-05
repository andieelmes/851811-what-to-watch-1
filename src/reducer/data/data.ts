import { Dispatch } from "react";
import { Movie } from 'types';
import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

import {
  ALL_GENRES
} from "movie-variables";
import {Data} from 'types';

const initialState: Data = {
  genre: ALL_GENRES,
  movies: [],
  genres: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const loadMovies: ActionCreator<Action> = (movies: Movie[]) => {
  return {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  };
};

const changeGenre: ActionCreator<Action> = (genre: string) => {
  return {
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  };
};

const ActionCreator = {
  loadMovies: loadMovies,
  changeGenre: changeGenre,
};

const Operation = {
  loadMovies: () :ThunkAction<void, Data, null, AnyAction> => (dispatch: ThunkDispatch<Data, void, AnyAction>, _getState: () => Data, api: any) => {
    return api.get(`/films`)
      .then((response) => {
        const data = response.data.map((movie) => {
          return {
            id: movie.id,
            img: movie.background_image,
            title: movie.name,
            preview: movie.preview_video_link,
            genre: movie.genre.toLowerCase(),
          }
        })
        dispatch(ActionCreator.loadMovies(data));
      });
  },
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES: return {...state, movies: action.payload}
    case ActionType.CHANGE_GENRE: return {...state, genre: action.payload}
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
