/* test/app.js */

import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/components/App';
import Layout from '../src/components/Layout';

test('<App /> component renders a <Layout />', (t) => {
  const wrapper = shallow(<App />);
  t.is(wrapper.find(Layout).length, 1);
});

