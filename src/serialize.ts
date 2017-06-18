import 'reflect-metadata';

import { Serializable } from '.';

const serializableKey = 'serializable-property';
const deserializationKey = 'deserializable-properties';

export function Serialize(identifier?: string) {

  return function Serialize(target: any, key: string) {
    if (!Serializable.prototype.isPrototypeOf(target)) {
      return;
    }
    
    let jsonKey = identifier || key;
    
    Reflect.defineMetadata(serializableKey, jsonKey, target, key);
    
    let deserializationMap = Reflect.getMetadata(deserializationKey, target) || new Map();
    deserializationMap.set(jsonKey, key);
    Reflect.defineMetadata(deserializationKey, deserializationMap, target)
  };

}
