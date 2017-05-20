import 'reflect-metadata';

export abstract class Serializable {

  public toJson(): string {
    const result: { [key: string]: any } = {};

    Object.keys(this).forEach((key: string) => {
      const identifier: string = Reflect.getMetadata('serializable-property', this, key);

      if (identifier) {
        result[identifier] = (this as any)[key];
      }
    });

    return JSON.stringify(result);
  }

}
