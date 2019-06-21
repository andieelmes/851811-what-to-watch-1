import MockAdapter from "axios-mock-adapter";
import {createAPI} from "App/api";
import {
  ActionType,
  ActionCreator,
  Operation,
} from "./data";

const serverMovies = [{
  id: 1,
  img: `https://es31-server.appspot.com/wtw/static/film/background/Midnight_Special.jpg`,
  name: `Midnight Special`,
  [`preview_video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  [`video_link`]: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  genre: `Action`,
  [`poster_image`]: `https://es31-server.appspot.com/wtw/static/film/poster/Midnight_Special.jpg`,
  [`background_image`]: `https://es31-server.appspot.com/wtw/static/film/background/Midnight_Special.jpg`,
  [`background_color`]: `#828585`,
  description: `A father and son go on the run, pursued by the government and a cult drawn to the child's special powers.`,
  rating: 3.3,
  [`scores_count`]: 67815,
  director: `Jeff Nichols`,
  starring: [
    `Michael Shannon`,
    `Joel Edgerton`,
    `Kirsten Dunst `
  ],
  [`run_time`]: 112,
  released: 2016,
  [`is_favorite`]: false
}];


const movies = [{
  id: 1,
  img: `https://es31-server.appspot.com/wtw/static/film/background/Midnight_Special.jpg`,
  title: `Midnight Special`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  video: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  genre: `action`,
  poster: `https://es31-server.appspot.com/wtw/static/film/poster/Midnight_Special.jpg`,
  backgroundImage: `https://es31-server.appspot.com/wtw/static/film/background/Midnight_Special.jpg`,
  backgroundColor: `#828585`,
  description: `A father and son go on the run, pursued by the government and a cult drawn to the child's special powers.`,
  rating: 3.3,
  ratingsCount: 67815,
  director: `Jeff Nichols`,
  starring: [
    `Michael Shannon`,
    `Joel Edgerton`,
    `Kirsten Dunst `
  ],
  duration: 112,
  year: 2016,
  favorite: false
}];

describe(`Reducer`, () => {
  it(`should make a correct API call to /films and return adapted data`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, serverMovies);

    return moviesLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: movies,
        });
      });
  });

  it(`should make a correct API call to /films/promo and return adapted data`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const promoMovieLoader = Operation.loadPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, serverMovies[0]);

    return promoMovieLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: movies[0],
        });
      });
  });

  it(`should make a correct API call to /favorite and return adapted data`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, serverMovies);

    return favoritesLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: movies,
        });
      });
  });

  it(`should return correct action on genre change`, () => {
    expect(ActionCreator.changeGenre(`comedies`)).toEqual({
      type: `CHANGE_GENRE`,
      payload: `comedies`,
    });
  });

  it(`should make a correct API call to /favorite/id/is_favorite when adding/removing film to/from favorites and return data of that film`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const favoriteToggler = Operation.toggleFavorite(1, true);

    apiMock
      .onPost(`/favorite/1/0`)
      .reply(200, serverMovies[0]);

    return favoriteToggler(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_MOVIE,
          payload: movies[0],
        });
      });
  });

  it(`should make a correct API call to /comments/id when loading comments`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const commentsLoader = Operation.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{}]);

    return commentsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: {
            id: 1,
            reviews: [{}]
          },
        });
      });
  });

  it(`should make a correct API call to /comments/id when posting comments`, () => {
    const dispatch = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const commentsPoster = Operation.postComment(1, 5, `Yeah`, onSuccess, onError);

    apiMock
      .onPost(`/comments/1`)
      .reply(200);

    return commentsPoster(dispatch, jest.fn(), api)
      .then(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
      });
  });
});
