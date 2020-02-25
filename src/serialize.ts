import 'reflect-metadata';

import { Serializable } from '.';

const serializableKey = 'serializable-property';
const deserializationKey = 'deserializable-properties';

export function Serialize(identifier?: string) {

  return (target: any, key: string) => {
    if (!Serializable.prototype.isPrototypeOf(target)) {
      return;
    }

    const jsonKey = identifier || key;
    Reflect.defineMetadata(serializableKey, jsonKey, target, key);

    const deserializationMap = Reflect.getMetadata(deserializationKey, target) || new Map();
    deserializationMap.set(jsonKey, key);
    Reflect.defineMetadata(deserializationKey, deserializationMap, target);
  };

}
