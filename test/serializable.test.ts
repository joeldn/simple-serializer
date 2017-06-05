import {} from 'mocha';
import { expect, assert } from 'chai';

import Foo from './fixtures/foo';
import FooNonSerializable from './fixtures/fooNonSerializable';

describe('serializable', () => {
  const testObject = {
    stringProperty: 'bar',
    booleanProperty: false,
    differentArrayProperty: ['one', 'two', 'three'],
    objectProperty: {
      foo: 'bar',
      bar: [1, 2, 3]
    }
  };
  
  describe('on class', () => {
    it('fails if not extended by Serializable', () => {
      const fooNS: FooNonSerializable = new FooNonSerializable();
      Object.keys(fooNS).forEach((key: string) => {
        return expect(Reflect.hasMetadata('serializable-property', fooNS, key)).to.be.false;
      });
    });

    it('returns correctly serialized object when calling toJson()', () => {
      const foo: Foo = new Foo();
      expect(JSON.parse(foo.toJson())).to.deep.equal(testObject);
    });
  
    it('correctly populates object when calling fillFromJson(json)', () => {
      const foo: Foo = new Foo();
      const reference: Foo = new Foo();
      foo.fillFromJson(JSON.stringify({
        "stringProperty": "zip",
        "booleanProperty": true,
        "differentArrayProperty": ["three", "two", "one"],
        "objectProperty": {
          "zip": "zap",
          "zap": [3, 2, 1]
        }
      }));
      
      expect(foo).to.deep.equal({
        "stringProperty": "zip",
        "booleanProperty": true,
        "arrayProperty": ["three", "two", "one"],
        "numberProperty": 42,
        "objectProperty": {
          "zip": "zap",
          "zap": [3, 2, 1]
        }
      });
    });
  });
});
