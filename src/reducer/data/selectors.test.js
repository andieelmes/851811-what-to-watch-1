import {
  getMovies,
  getGenres
} from "./selectors";
import {
  ALL_GENRES
} from "App/movie-variables";
import Namespace from "../namespaces";

const NAMESPACE = Namespace.DATA;

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

describe(`Selector`, () => {
  it(`should return correct movie array when genre is chosen`, () => {
    const mockedState = {
      [NAMESPACE]: {
        movies,
        genre: `comedies`
      }
    };

    expect(getMovies(mockedState)).toEqual([{
      id: 1,
      img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      genre: `comedies`,
    }]);
  });

  it(`should return array of all movies when genre is defaulted to all genres`, () => {
    const mockedState = {
      [NAMESPACE]: {
        movies,
        genre: ALL_GENRES
      }
    };

    expect(getMovies(mockedState)).toEqual(movies);
  });

  it(`should return array of all genres`, () => {
    const mockedState = {
      [NAMESPACE]: {
        movies,
      }
    };

    expect(getGenres(mockedState)).toEqual([`all genres`, `comedies`, `crime`]);
  });
});
