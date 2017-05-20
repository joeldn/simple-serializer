import { Serialize } from '../../src';

export default class FooNonSerializable {

  @Serialize()
  private stringProperty: string;

  @Serialize()
  private booleanProperty: boolean;

  constructor() {
    this.stringProperty = 'bar';
    this.booleanProperty = false;
  }
}
