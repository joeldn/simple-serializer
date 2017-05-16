import 'reflect-metadata';

import { Serializable } from '.';

export function Serialize(identifier?: string) {

  return function Serialize(target: any, key: string) {
    if (!Serializable.prototype.isPrototypeOf(target)) {
      console.error(`Serialize decorator can only be used in class extended by Serializable`);
      return;
    }

    Reflect.defineMetadata('serializable-property', identifier || key, target, key);
  };

}
