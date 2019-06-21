import {
  getMovies,
  getGenres,
  getReviews,
  getPromoMovie,
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

  it(`should return reviews`, () => {
    const mockedState = {
      [NAMESPACE]: {
        reviews: {
          1: [
            {
              id: 1,
              user: {
                id: 12,
                name: `Isaac`
              },
              rating: 2,
              comment: `The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics. `,
              date: `2019-06-20T08:10:37.227Z`
            }
          ]
        },
      }
    };

    expect(getReviews(mockedState, 1)).toEqual([
      {
        id: 1,
        user: {
          id: 12,
          name: `Isaac`
        },
        rating: 2,
        comment: `The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics. `,
        date: `2019-06-20T08:10:37.227Z`
      }
    ]);
  });

  it(`should return promo movie`, () => {
    const mockedState = {
      [NAMESPACE]: {
        movies,
        promoMovie: {id: 1},
      }
    };

    expect(getPromoMovie(mockedState)).toEqual({
      id: 1,
      img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      genre: `comedies`,
    });
  });
});
