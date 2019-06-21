import {
  getAuthorizationStatus,
  getUserInfo,
} from "./selectors";

import Namespace from "../namespaces";

const NAMESPACE = Namespace.USER;

describe(`Selector`, () => {
  it(`should return authorization state`, () => {
    const mockedState = {
      [NAMESPACE]: {
        isAuthorizationRequired: false,
        avatar: ``,
        name: ``,
      }
    };

    expect(getAuthorizationStatus(mockedState)).toEqual(true);
  });

  it(`should return user info`, () => {
    const mockedState = {
      [NAMESPACE]: {
        isAuthorizationRequired: false,
        avatar: ``,
        name: ``,
      }
    };

    expect(getUserInfo(mockedState)).toEqual({
      avatar: ``,
      name: ``,
    });
  });
});
