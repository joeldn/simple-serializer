import 'reflect-metadata';

export abstract class Serializable {

  public toJson(): string {
    const result = {};

    Object.keys(this).forEach((key: string) => {
      const identifier = Reflect.getMetadata('serializable-property', this, key);

      if (identifier) {
        result[identifier] = this[key];
      }
    });

    return JSON.stringify(result);
  }

}
