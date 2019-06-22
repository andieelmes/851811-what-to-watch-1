import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import withReviewForm from 'App/hocs/with-review-form/with-review-form';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureMockStore([thunk]);
const storeStateMock = {
  USER: {
    name: `1`,
    avatar: `img.png`,
    isAuthorizationRequired: false,
  }
};

const MockComponent = (props) => (
  <div>
    <textarea value={props.text} onChange={props.onTextChange}/>
  </div>
);

MockComponent.propTypes = {
  onTextChange: PropTypes.func,
  text: PropTypes.string,
};

const MockComponentWrapped = withReviewForm(MockComponent);

describe(`withReviewForm HOC`, () => {
  const textChangeHandler = jest.fn();
  const ratingChangeHandler = jest.fn();
  const formSubmitHandler = jest.fn();
  const successHandler = jest.fn();
  const errorHandler = jest.fn();

  it(`should update state on input change`, () => {
    const wrappedComponent = shallow(
        <MockComponentWrapped
          onTextChange={textChangeHandler}
          onRatingChange={ratingChangeHandler}
          onFormSubmit={formSubmitHandler}
          onSuccess={successHandler}
          onError={errorHandler}
          store={mockStore(storeStateMock)}
        />
    );

    expect(wrappedComponent.dive().state(`text`)).toEqual(``);

    const text = wrappedComponent.dive().find(MockComponent).dive().find(`textarea`);

    text.simulate(`change`, {
      target: {value: `1`}
    });

    expect(textChangeHandler).toHaveBeenCalledWith({
      target: {value: `1`}
    });

    setTimeout(() => {
      expect(wrappedComponent.dive().state(`text`)).toEqual(`1`);
    }, 0);
  });
});
