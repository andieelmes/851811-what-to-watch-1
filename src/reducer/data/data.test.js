import MockAdapter from "axios-mock-adapter";
import {createAPI} from "App/api";
import {
  ActionType,
  ActionCreator,
  Operation,
} from "./data";

const serverMovies = [{
  id: 1,
  [`background_image`]: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  [`preview_video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Comedies`,
},
{
  id: 2,
  [`background_image`]: `img/bohemian-rhapsody.jpg`,
  name: `Bohemian Rhapsody`,
  [`preview_video_link`]: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Crime`,
}];


const movies = [{
  id: 1,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `comedies`,
},
{
  id: 2,
  img: `img/bohemian-rhapsody.jpg`,
  title: `Bohemian Rhapsody`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `crime`,
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
