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
      });
  },
};

const reducer = (state = initialState, action) => {
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
