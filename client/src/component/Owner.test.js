import React from 'react';
import Adapter from 'enzyme-adapter-react-16.1';
import { shallow, configure, mount} from 'enzyme';
import App from "../App";
import OwnerCalendar from './Calendar';
import PropTypes, { array } from 'prop-types';
import sinon from 'sinon';
// import Owner from "./Owner";

const didMount = sinon.spy();

configure({adapter: new Adapter()});
test('should render OwnerCalendar component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(OwnerCalendar));
});

configure({adapter: new Adapter()});
test('should mount owner property', () => {
  class Owner extends React.Component {
    constructor(props) {
      super(props);
      this.componentDidMount = didMount;
    };
    render() {
      const { id } = this.props;
      return (
        <div id={id}>
          {id}
        </div>
      )
    }
  };
  Owner.propTypes = {
    id: PropTypes.string.isRequired,
  };
  const wrapper = mount(<Owner id="owner" />);
  expect(didMount).toHaveProperty('callCount', 1);
  wrapper.unmount();
});

// configure({adapter: new Adapter()});
// test('should have ownerId in state', () => {
//   const wrapper = shallow(<Owner id="owner" />);
//   expect(wrapper.state('ownerId')).toEqual('1');
//   expect(wrapper.state('ownerId')).toEqual('2');
//   expect(wrapper.state('ownerId')).toEqual('3');
// });