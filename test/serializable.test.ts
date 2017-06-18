import {} from 'mocha';
import { expect } from 'chai';

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
      foo.stringProperty = 'bar';
      foo.booleanProperty = false;
      foo.numberProperty = 42;
      foo.arrayProperty = ['one', 'two', 'three'];
      foo.objectProperty = { foo: 'bar', bar: [1, 2, 3] };

      expect(JSON.parse(foo.toJson())).to.deep.equal(testObject);
    });

    it('correctly populates object when calling fillFromJson(json)', () => {
      const foo: Foo = new Foo();
      foo.fillFromJson(JSON.stringify(testObject));

      expect(JSON.parse(foo.toJson())).to.deep.equal(testObject);
    });

    it('throws error when properties are missing during fillFromJson(json)', () => {
      const foo: Foo = new Foo();

      expect(() =>
        foo.fillFromJson(JSON.stringify({
          booleanProperty: true
        }))
      ).to.throw('must be provided');
    });

    it('throws error when properties have wrong types during fillFromJson(json)', () => {
      const foo: Foo = new Foo();

      expect(() =>
        foo.fillFromJson(JSON.stringify({
          ...testObject,
          ...{ booleanProperty: 'A STRING!' }
        }))
      ).to.throw('should be of type');
    });
  });
});
