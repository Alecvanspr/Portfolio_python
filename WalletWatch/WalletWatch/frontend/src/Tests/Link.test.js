import renderer from 'react-test-renderer';
import Link from './Link'

//hiermee test je vooral hoe en of de state veranderd wordt
it('changes the class when hovered', () => {

    //Arrange
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
    //Dit is de eerste keer dat het wordt gedaan
  //act
  let tree = component.toJSON();
  //assert
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
