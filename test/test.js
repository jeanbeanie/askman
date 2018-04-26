/* test/test.js */

import test from 'ava';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// provides Enzyme compatibility with React 16
Enzyme.configure({ adapter: new Adapter() });

// testing mock browser env
test('can insert to DOM', (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  t.is(document.querySelector('div'), div);
});

// load other tests
require('./app');
require('./layout');
