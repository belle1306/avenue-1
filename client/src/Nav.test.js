import React from 'react';
import Adapter from 'enzyme-adapter-react-16.1';
import { shallow, configure } from 'enzyme';
import App from "./App";
import Nav from "../src/component/Nav";
import Manager from "../src/component/Manager";
import Owner from "../src/component/Owner";

configure({adapter: new Adapter()});

// test('should render Home component', ()=> {
//         const wrapper = shallow(<App />);
//         expect(wrapper.find(Home));
// });

test('should render Manager component', ()=> {
        const wrapper = shallow(<Nav />);
        expect(wrapper.find(Manager));
});
test('should render Owner component', ()=> {
        const wrapper = shallow(<Nav />);
        expect(wrapper.find(Owner));
});


