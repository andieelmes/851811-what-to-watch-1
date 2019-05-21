import {
  ActionCreator,
} from "reducer";

import {
  ALL_GENRES
} from "consts";

describe(`Action creators work correctly`, () => {
  it(`Action creator for genre change returns correct action`, () => {
    expect(ActionCreator.changeGenre(`comedies`)).toEqual({
      type: `CHANGE_GENRE`,
      payload: `comedies`,
    });
  });

  it(`Action creator for genre based movie filtering returns correct movie array when genre is chosen`, () => {
    expect(ActionCreator.getMovies(
        `comedies`,
        [{
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
        }])).toEqual({
      type: `GET_MOVIES`,
      payload: [{
        id: 1,
        img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        genre: `comedies`,
      }],
    });
  });

  it(`Action creator for genre based movie filtering returns array of all movies when genre is defaulted to all genres`, () => {
    expect(ActionCreator.getMovies(
        ALL_GENRES,
        [{
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
        }])).toEqual({
      type: `ALL_MOVIES`,
      payload: [{
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
      }],
    });
  });
});
