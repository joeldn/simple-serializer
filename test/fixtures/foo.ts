import { Serializable, Serialize } from '../../src';

export default class Foo extends Serializable {

  @Serialize()
  private stringProperty: string;

  @Serialize()
  private booleanProperty: boolean;

  private numberProperty: number;

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
