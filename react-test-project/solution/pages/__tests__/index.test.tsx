import renderer from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import Home from '../index'

describe('Home page', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
