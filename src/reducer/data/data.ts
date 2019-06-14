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
  reviews: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  UPDATE_MOVIE: `UPDATE_MOVIE`,
};

const loadMovies: ActionCreator<Action> = (movies: Movie[]) => {
  return {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  };
};

const updateMovie: ActionCreator<Action> = (movie) => {
  return {
    type: ActionType.UPDATE_MOVIE,
    payload: movie,
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

const loadComments: ActionCreator<Action> = (reviews, id) => {
  return {
    type: ActionType.LOAD_REVIEWS,
    payload: {
      id,
      reviews,
    },
  };
};

const ActionCreator = {
  loadMovies: loadMovies,
  changeGenre: changeGenre,
  loadFavorites: loadFavorites,
  loadComments: loadComments,
  updateMovie: updateMovie,
};

const adapt = (movie) => ({
  id: movie.id,
  img: movie.background_image,
  title: movie.name,
  preview: movie.preview_video_link,
  video: movie.video_link,
  genre: movie.genre.toLowerCase(),
  poster: movie.poster_image,
  backgroundImage: movie.background_image,
  backgroundColor: movie.background_color,
  description: movie.description,
  rating: movie.rating,
  ratingsCount: movie.scores_count,
  director: movie.director,
  starring: movie.starring,
  duration: movie.run_time,
  year: movie.released,
  favorite: movie.is_favorite,
})

const onMovieListLoadSuccess = (response) => {
  return response.data.map((movie) => adapt(movie))
}

const Operation = {
  loadMovies: () :ThunkAction<void, Data, null, AnyAction> => (dispatch: ThunkDispatch<Data, void, AnyAction>, _getState: () => Data, api: any) => {
    return api.get(`/films`)
      .then((response) => {
        const data = onMovieListLoadSuccess(response)
        dispatch(ActionCreator.loadMovies(data));
      })
      .catch((error) => {
        console.log(error);
      })
  },
  loadFavorites: () :ThunkAction<void, Data, null, AnyAction> => (dispatch: ThunkDispatch<Data, void, AnyAction>, _getState: () => Data, api: any) => {
    return api.get(`/favorite`)
      .then((response) => {
        const data = onMovieListLoadSuccess(response)
        dispatch(ActionCreator.loadFavorites(data));
      })
      .catch((error) => {
        console.log(error);
      })
  },
  loadComments: (id: number) :ThunkAction<void, Data, null, AnyAction> => (dispatch: ThunkDispatch<Data, void, AnyAction>, _getState: () => Data, api: any) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data, id));
      })
      .catch((error) => {
        console.log(error);
      })
  },
  postComment: (id: number, rating: number, comment: string, onSuccess: () => void, onError: () => void): ThunkAction<void, Data, null, AnyAction> => (dispatch: ThunkDispatch<Data, void, AnyAction>, _getState: () => Data, api: any) => {
    return api.post(`/comments/${id}`, {rating, comment})
      .then(onSuccess)
      .catch((error) => {
        console.log(error);
        onError()
      })
  },
  toggleFavorite: (id: number, favorite: boolean): ThunkAction<void, Data, null, AnyAction> => (dispatch: ThunkDispatch<Data, void, AnyAction>, _getState: () => Data, api: any) => {
    return api.post(`/favorite/${id}/${favorite ? '0' : '1'}`)
      .then((response) => {
        const data = adapt(response.data)
        dispatch(ActionCreator.updateMovie(data));
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
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: {
          [action.payload.id]: action.payload.reviews
        }
      }
    case ActionType.UPDATE_MOVIE:
      const movies: Movie[]= [ ...state.movies]
      const movieIndex: number = movies.findIndex((movie: Movie) => movie.id === action.payload.id);
      movies.splice(movieIndex, 1, action.payload);

      return {
        ...state,
        movies: movies
      }
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
