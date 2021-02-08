import React from 'react';
import Adapter from 'enzyme-adapter-react-16.1';
import { shallow, configure } from 'enzyme';
import App from "../App";yarn add prop-types
import OwnerCalendar from './Calendar';

configure({adapter: new Adapter()});
test('should render OwnerCalendar component', ()=> {
        const wrapper = shallow(<App />);
        expect(wrapper.find(OwnerCalendar));
})