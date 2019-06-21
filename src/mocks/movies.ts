export const MOVIES = [
  {
    id: 1,
    img: 'https://es31-server.appspot.com/wtw/static/film/background/Midnight_Special.jpg',
    title: 'Midnight Special',
    preview: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    video: 'http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4',
    genre: 'action',
    poster: 'https://es31-server.appspot.com/wtw/static/film/poster/Midnight_Special.jpg',
    backgroundImage: 'https://es31-server.appspot.com/wtw/static/film/background/Midnight_Special.jpg',
    backgroundColor: '#828585',
    description: 'A father and son go on the run, pursued by the government and a cult drawn to the child\'s special powers.',
    rating: 3.3,
    ratingsCount: 67815,
    director: 'Jeff Nichols',
    starring: [
      'Michael Shannon',
      'Joel Edgerton',
      'Kirsten Dunst '
    ],
    duration: 112,
    year: 2016,
    favorite: false
  },
  {
    id: 2,
    img: 'https://es31-server.appspot.com/wtw/static/film/background/What-We-Do-in-the-Shadows.jpg',
    title: 'What We Do in the Shadows',
    preview: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    video: 'http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4',
    genre: 'comedy',
    poster: 'https://es31-server.appspot.com/wtw/static/film/poster/What-We-Do-in-the-Shadows.jpg',
    backgroundImage: 'https://es31-server.appspot.com/wtw/static/film/background/What-We-Do-in-the-Shadows.jpg',
    backgroundColor: '#A39E81',
    description: 'A look into the daily (or rather, nightly) lives of three vampires who\'ve lived together for over 100 years, in Staten Island.',
    rating: 4.2,
    ratingsCount: 6173,
    director: 'Jemaine Clement',
    starring: [
      'Kayvan Novak',
      'Matt Berry',
      'Natasia Demetriou'
    ],
    duration: 30,
    year: 2019,
    favorite: true
  }
];

export const GENRES = [
  `all genres`, `comedies`, `crime`, `documentaries`, `dramas`,
];

export const REVIEWS = [
  {
    id: 1,
    user: {
      id: 13,
      name: 'Zak'
    },
    rating: 2,
    comment: 'A movie that will take you to another world full of emotions.',
    date: '2019-05-30T04:04:34.909Z'
  },
  {
    id: 2,
    user: {
      id: 11,
      name: 'Jack'
    },
    rating: 5,
    comment: 'I really find it difficult to believe this movie is rated highly by people. It\'s hands down the worst movie I\'ve seen in my life',
    date: '2019-06-02T04:04:34.909Z'
  },
  {
    id: 3,
    user: {
      id: 14,
      name: 'Corey'
    },
    rating: 4,
    comment: 'It was well acted, directed, and the music was good. But the story is yawn. Not trying to rip anybody but I checked my watch a dozen times during this movie.',
    date: '2019-06-10T04:04:34.909Z'
  }
];
