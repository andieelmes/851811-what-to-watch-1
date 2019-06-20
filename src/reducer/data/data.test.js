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

  it(`should return correct action on genre change`, () => {
    expect(ActionCreator.changeGenre(`comedies`)).toEqual({
      type: `CHANGE_GENRE`,
      payload: `comedies`,
    });
  });
});
