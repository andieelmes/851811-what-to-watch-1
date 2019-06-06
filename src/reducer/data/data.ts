import { Movie } from 'types';
import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';

import {
  ALL_GENRES
} from "App/movie-variables";
import {Data} from 'App/types';

const initialState: Data = {
  genre: ALL_GENRES,
  movies: [],
  favorites: [],
  genres: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
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

const loadFavorites: ActionCreator<Action> = (favorites: Movie[]) => {
  return {
    type: ActionType.LOAD_FAVORITES,
    payload: favorites,
  };
};

const ActionCreator = {
  loadMovies: loadMovies,
  changeGenre: changeGenre,
  loadFavorites: loadFavorites,
};

const onMovieListLoadSuccess = (response, dispatch: Dispatch<any>) => {
  return response.data.map((movie) => {
    return {
      id: movie.id,
      img: movie.background_image,
      title: movie.name,
      preview: movie.preview_video_link,
      video: movie.video_link,
      genre: movie.genre.toLowerCase(),
      poster: movie.poster_image,
      backgroundColor: movie.background_color,
      description: movie.description,
      rating: movie.rating,
      ratingsCount: movie.scores_count,
      director: movie.director,
      starring: movie.starring,
      duration: movie.run_time,
      year: movie.released,
      favorite: movie.favorite,
    }
  })
}

const Operation = {
  loadMovies: () :ThunkAction<void, Data, null, AnyAction> => (dispatch: ThunkDispatch<Data, void, AnyAction>, _getState: () => Data, api: any) => {
    return api.get(`/films`)
      .then((response) => {
        const data = onMovieListLoadSuccess(response, dispatch)
        dispatch(ActionCreator.loadMovies(data));
      })
      .catch((error) => {
        console.log(error);
      })
  },
  loadFavorites: () :ThunkAction<void, Data, null, AnyAction> => (dispatch: ThunkDispatch<Data, void, AnyAction>, _getState: () => Data, api: any) => {
    return api.get(`/favorite`)
      .then((response) => {
        const data = onMovieListLoadSuccess(response, dispatch)
        dispatch(ActionCreator.loadFavorites(data));
      })
      .catch((error) => {
        console.log(error);
      })
  },
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES: return {...state, movies: action.payload}
    case ActionType.CHANGE_GENRE: return {...state, genre: action.payload}
    case ActionType.LOAD_FAVORITES: return {...state, favorites: action.payload}
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
