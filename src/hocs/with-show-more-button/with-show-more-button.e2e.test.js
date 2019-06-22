import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withShowMoreButton from 'App/hocs/with-show-more-button/with-show-more-button';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withShowMoreButton(MockComponent);

describe(`withShowMoreButton HOC`, () => {
  it(`should increase amount of items shown on onShowMore button click`, () => {
    const wrappedComponent = shallow(
        <MockComponentWrapped
          show={3}
          increase={4}
          movies={[]}
        />
    );

    expect(wrappedComponent.state(`show`)).toEqual(3);

    wrappedComponent.instance()._handleMoreButtonClick();
    expect(wrappedComponent.state(`show`)).toEqual(7);
  });
});
