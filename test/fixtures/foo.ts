import { Serializable, Serialize } from '../../src';

export default class Foo extends Serializable {

  @Serialize()
  public stringProperty: string;

  @Serialize()
  public booleanProperty: boolean;

  public numberProperty: number;

  @Serialize('differentArrayProperty')
  public arrayProperty: string[];

  @Serialize()
  public objectProperty: { [key: string]: string | number[] };

  constructor() {
    super();
    this.stringProperty = 'bar';
    this.booleanProperty = false;
    this.numberProperty = 42;
    this.arrayProperty = ['foo', 'bar'];
    this.objectProperty = {};
  }
}
