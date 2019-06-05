export interface Movie {
  id: number,
  img: string,
  title: string,
  preview: string,
  genre: string,
}

export interface User {
  isAuthorizationRequired: boolean,
  avatar: string,
  name: string,
}

export interface Data {
  genre: string,
  movies: [],
  genres: [],
}

export interface State {
  DATA: Data,
  USER: User,
};
