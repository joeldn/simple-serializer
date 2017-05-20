import {} from 'mocha';
import { expect, assert } from 'chai';

import Foo from './fixtures/foo';
import FooNonSerializable from './fixtures/fooNonSerializable';

describe('serializable', () => {
  describe('on class', () => {
    it('fails if not extended by Serializable', () => {
      const fooNS: FooNonSerializable = new FooNonSerializable();
      Object.keys(fooNS).forEach((key: string) => {
        return expect(Reflect.hasMetadata('serializable-property', fooNS, key)).to.be.false;
      });
    });

    it('returns correctly serialized object when calling toJson()', () => {
      const foo: Foo = new Foo();
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
