import 'reflect-metadata';

const deserializationKey = 'deserializable-properties';
const serializeKey = 'serializable-property';

export abstract class Serializable {

  public toJson(): string {
    const result: { [key: string]: any } = {};

    Object.keys(this).forEach((key: string) => {
      const identifier: string = Reflect.getMetadata(serializeKey, this, key);

      if (identifier) {
        result[identifier] = (this as any)[key];
      }
    });

    return JSON.stringify(result);
  }

  public fillFromJson(json: string) {
    const source: { [key: string]: any } = JSON.parse(json);
    const map: Map<string, string> = Reflect.getMetadata(deserializationKey, this);

    map.forEach((propName: string, jsonKey: string) => {
      const value = source[jsonKey];
      if (!value && !(jsonKey in source)) {
        throw new TypeError(`${propName} must be provided when deserializing ${this.constructor.name}`);
      }

      const propType = Reflect.getMetadata('design:type', this, propName);

      // runtime type checking
      if (value instanceof propType || value.constructor === propType) {
        (this as any)[propName] = value;
      } else {
        throw new TypeError(`${propName} should be of type ${propType} when deserializing ${this.constructor.name}`);
      }
    });
    return this;
  }

}
