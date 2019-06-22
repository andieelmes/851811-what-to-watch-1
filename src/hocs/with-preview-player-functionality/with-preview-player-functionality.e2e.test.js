import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withPreviewPlayerFunctionality from 'App/hocs/with-preview-player-functionality/with-preview-player-functionality';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => (
  <div>
    <video/>
  </div>
);

const MockComponentWrapped = withPreviewPlayerFunctionality(MockComponent);

describe(`withMoviePlayerFunctionality HOC`, () => {
  function mockGetRef() {
    // eslint-disable-next-line no-invalid-this
    this.contentRef = {src: ``};
  }

  it(`should update status of the video`, () => {
    const spy = jest.spyOn(MockComponentWrapped.prototype, `componentDidMount`).mockImplementationOnce(mockGetRef);

    const wrappedComponent = shallow(
        <MockComponentWrapped
          active={true}
        />
    );

    expect(spy).toHaveBeenCalled();

    wrappedComponent.setProps({active: `false`});

    expect(wrappedComponent.state(`active`)).toEqual(false);

    wrappedComponent.setProps({active: `true`});

    expect(wrappedComponent.state(`active`)).toEqual(false);

    setTimeout(() => {
      expect(wrappedComponent.state(`active`)).toEqual(true);
    }, 1000);
  });
});
