import React from 'react';
import Adapter from 'enzyme-adapter-react-16.1';
import { shallow, configure } from 'enzyme';
import App from "../src/App";
import Nav from "../src/component/Nav";

configure({adapter: new Adapter()});
test('should render Nav component', ()=> {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Nav));
})


//     it('should render `.houselogo`', () => {
//         const wrapper = shallow(<App />);
//         expect(wrapper.find('.houselogo')).to.have.length(1);
//       });


//'Nav bar shows Home, Manager, Owner, Login btns'
//'It should not allow letters to be inputted'
//'weekly rent should have decimal(6.0,2.0)'
//'postcode should have varchar(5)'