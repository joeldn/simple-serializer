# Simple Serializer
A simple serialization library for JS classes to be used in Typescript or ES7 projects.

[![Build Status](https://travis-ci.org/joeldn/simple-serializer.svg?branch=master)](https://travis-ci.org/joeldn/simple-serializer)

## Installation

```bash
npm install simple-serializer --save
```

## Testing

```bash
npm test
```

## Example usage

Extend your class with the `Serializable` abstract class and add the `Serialize` decorator
to any parameter you want to have show up in the serialized object.

```js
import { Serializable, Serialize } from 'simple-serializer';

export default class Foo extends Serializable {

  // add decorator for property to show up in JSON
  @Serialize()
  private stringProperty: string;

  @Serialize()
  private booleanProperty: boolean;

  private numberProperty: number;

  // pass in a string as a different identifier
  @Serialize('differentArrayProperty')
  private arrayProperty: string[];

  @Serialize()
  private objectProperty: { [key: string]: string | number[] };

  constructor() {
    super();

    this.stringProperty = 'bar';
    this.booleanProperty = false;
    this.numberProperty = 42;
    this.arrayProperty = ['one', 'two', 'three'];
    this.objectProperty = {
      foo: 'bar',
      bar: [1, 2, 3]
    };
  }
}
```

After creating an instance of your class you can call the `toJson()` function on it.

```js
const foo = new Foo();
console.log(foo.toJson());
```

For the class instance `foo` this will return the following JSON object:

```json
{
  "stringProperty": "bar",
  "booleanProperty": false,
  "differentArrayProperty": ["one", "two", "three"],
  "objectProperty": {
    "foo": "bar",
    "bar": [1, 2, 3]
  }
}
```
