import MockAdapter from "axios-mock-adapter";
import {createAPI} from "App/api";
import {
  ActionType,
  Operation,
} from "./user";

describe(`Reducer`, () => {
  it(`should make a correct post API call to /login and return call onSuccess callback on success`, () => {
    const dispatch = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);

    const loginPoster = Operation.postLogin(`qwerty@gmail.com`, 1, onSuccess, onError);

    apiMock
      .onPost(`/login`)
      .reply(200, {
        [`avatar_url`]: `/wtw/static/avatar/9.jpg`,
        email: `qwerty@gmail.com`,
        id: 1,
        name: `qwerty`,
      });

    return loginPoster(dispatch, jest.fn(), api)
      .then(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: false,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_USER_DATA,
          payload: {
            avatar: `https://es31-server.appspot.com/wtw/static/avatar/9.jpg`,
            name: `qwerty`,
          },
        });
      });
  });

  it(`should make a correct get API call to /login and get user info`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);

    const loginGetter = Operation.getLogin();

    apiMock
      .onGet(`/login`)
      .reply(200, {
        [`avatar_url`]: `/wtw/static/avatar/9.jpg`,
        email: `qwerty@gmail.com`,
        id: 1,
        name: `qwerty`,
      });

    return loginGetter(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: false,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_USER_DATA,
          payload: {
            avatar: `https://es31-server.appspot.com/wtw/static/avatar/9.jpg`,
            name: `qwerty`,
          },
        });
      });
  });
});
