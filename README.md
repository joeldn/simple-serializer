# Simple Serializer
A simple serialization library for JS classes to be used in Typescript or ES7 projects.

[![Build Status](https://travis-ci.org/joeldn/simple-serializer.svg?branch=master)](https://travis-ci.org/joeldn/simple-serializer)

### Installation

```
npm install --save simple-serializer
```

### Testing

```
npm test
```

### Example usage

```ts
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
calling
```ts
Foo.toJson()
```
returns
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
