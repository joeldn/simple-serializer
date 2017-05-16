"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _1 = require(".");
function Serialize(identifier) {
    return function Serialize(target, key) {
        if (!_1.Serializable.prototype.isPrototypeOf(target)) {
            console.error("Serialize decorator can only be used in class extended by Serializable");
            return;
        }
        Reflect.defineMetadata('serializable-property', identifier || key, target, key);
    };
}
exports.Serialize = Serialize;
//# sourceMappingURL=serialize.js.map