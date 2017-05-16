"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Serializable = (function () {
    function Serializable() {
    }
    Serializable.prototype.toJson = function () {
        var _this = this;
        var result = {};
        Object.keys(this).forEach(function (key) {
            var identifier = Reflect.getMetadata('serializable-property', _this, key);
            if (identifier) {
                result[identifier] = _this[key];
            }
        });
        return JSON.stringify(result);
    };
    return Serializable;
}());
exports.Serializable = Serializable;
//# sourceMappingURL=serializable.js.map