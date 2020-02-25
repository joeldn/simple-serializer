import { Serialize } from '../../src';

export default class FooNonSerializable {

  @Serialize()
  public stringProperty: string;

  @Serialize()
  public booleanProperty: boolean;

  constructor() {
    this.stringProperty = 'bar';
    this.booleanProperty = false;
  }
}
