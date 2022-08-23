import renderer from 'react-test-renderer';
import Link from './Link'

//hiermee test je vooral hoe en of de state veranderd wordt
it('changes the class when hovered', () => {

    //Arrange
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
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

/*
een test ziet er ongeveer zo uit:
    test("String van de naam van de text als een kleine beschrijving, ()=>{
        //arrange
                {{Hier moeten alle variabelen ingezet worden en ook geinitialiseerd}}
        //act
                {{Hier moet alles uitgevoerd worden en dat moet dan ook worden opgeslagen in }}    
        //assertions
        expect().toEqual()
    }")
*/