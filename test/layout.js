/* test/layout.js */

import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../src/components/Layout';

test('<Layout /> component renders children when passed in', (t) => {
  const wrapper = shallow(<Layout>
    <div className="foo" />
  </Layout>);
  t.true(wrapper.contains(<div className="foo" />));
});
