import 'reflect-metadata';

const deserializationKey = 'deserializable-properties';

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
  
  public fillFromJson(json: string) {
    const source: { [key: string]: any } = JSON.parse(json);
    const map: Map<string,string> = Reflect.getMetadata(deserializationKey, this);
    
    map.forEach((propName: string, jsonKey: string) => {
      let value = source[jsonKey];
      let propType = Reflect.getMetadata("design:type", this, propName);
      
      // Runtime type checking!!
      if(value instanceof propType || value.constructor == propType){
        (this as any)[propName] = value;
      } else {
        throw new TypeError(`${propName} should be of type ${propType} when deserializing ${this.constructor.name}`)
      }
    });
    
    return this
  }

}
