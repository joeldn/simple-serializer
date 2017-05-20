import 'reflect-metadata';

import { Serializable } from '.';

export function Serialize(identifier?: string) {

  return function Serialize(target: any, key: string) {
    if (!Serializable.prototype.isPrototypeOf(target)) {
      return;
    }

    Reflect.defineMetadata('serializable-property', identifier || key, target, key);
  };

}
