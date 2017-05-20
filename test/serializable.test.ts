import {} from 'mocha';

import { expect } from 'chai';

import Foo from './fixtures/foo';

let foo: Foo;

describe('serializable', () => {
  before(() => {
    foo = new Foo();
  });
  describe('on class', () => {
    it('returns correctly serialized object when calling toJson()', () => {
      expect(JSON.parse(foo.toJson())).to.deep.equal({
        stringProperty: 'bar',
        booleanProperty: false,
        differentArrayProperty: ['one', 'two', 'three'],
        objectProperty: {
          foo: 'bar',
          bar: [1, 2, 3]
        }
      });
    });
  });
});
