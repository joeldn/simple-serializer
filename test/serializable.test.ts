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
      // Have to do Object.assign otherwise deep equals is unhappy because types don't match
      expect(Object.assign({},foo)).to.deep.equal({
        stringProperty: 'zip',
        booleanProperty: true,
        numberProperty: 42,
        arrayProperty: [ 'three', 'two', 'one' ],
        objectProperty: { zip: 'zap', zap: [ 3, 2, 1 ] } });
    });
  
    it('throws error when properties are missing during fillFromJson(json)', () => {
      const foo: Foo = new Foo();
      
      expect(() =>
        foo.fillFromJson(JSON.stringify({
          "booleanProperty": true
        }))
      ).to.throw('must be provided');
    });
  
    it('throws error when properties have wrong types during fillFromJson(json)', () => {
      const foo: Foo = new Foo();
    
      expect(() =>
        foo.fillFromJson(JSON.stringify({
          "stringProperty": "zip",
          "booleanProperty": "A STRING!",
          "differentArrayProperty": ["three", "two", "one"],
          "objectProperty": {
            "zip": "zap",
            "zap": [3, 2, 1]
          }
        }))
      ).to.throw('should be of type')
      
    });
    
  });
});
