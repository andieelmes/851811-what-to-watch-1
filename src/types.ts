export interface Movie {
  id: number,
  img: string,
  title: string,
  preview: string,
  genre: string,
  poster: string,
  backgroundColor: string,
  description: string,
  rating: number,
  ratingsCount: number,
  director: string,
  starring: string[],
  duration: number,
  year: number,
  favorite: boolean,
}

export interface User {
  isAuthorizationRequired: boolean,
  avatar: string,
  name: string,
}

export interface Data {
  genre: string,
  movies: [],
  favorites: [],
  genres: [],
}

export interface State {
  DATA: Data,
  USER: User,
};
