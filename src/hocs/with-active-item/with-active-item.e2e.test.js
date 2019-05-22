import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from 'hocs/with-active-item/with-active-item.jsx';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

describe(`withActiveItem HOC`, () => {
  it(`should change activeItem on onChange callback`, () => {
    const wrappedComponent = shallow(<MockComponentWrapped
    />);

    wrappedComponent.props().onChange(`active-item`);
    expect(wrappedComponent.state(`activeItem`)).toEqual(`active-item`);
  });
});
