import {
  ALL_GENRES
} from "movie-variables";

const initialState = {
  genre: ALL_GENRES,
  movies: [],
  genres: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES: `GET_MOVIES`,
  GET_GENRES: `GET_GENRES`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),

  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),

  getGenres: (movies) => ({
    type: ActionType.GET_GENRES,
    payload: [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))],
  }),
};

const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
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
        dispatch(ActionCreator.getGenres(data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES: return {...state, movies: action.payload}
    case ActionType.CHANGE_GENRE: return {...state, genre: action.payload}
    case ActionType.GET_MOVIES: return {...state, movies: action.payload}
    case ActionType.GET_GENRES: return {...state, genres: action.payload}
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
