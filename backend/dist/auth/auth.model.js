"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
var typeTask;
(function (typeTask) {
    typeTask[typeTask["NIGHT"] = 0] = "NIGHT";
    typeTask[typeTask["CLEAN"] = 1] = "CLEAN";
    typeTask[typeTask["AVTASH"] = 2] = "AVTASH";
})(typeTask || (typeTask = {}));
exports.UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    hash: { type: String, required: true },
    password: { type: String, required: false },
    rating: { type: Number, required: false },
});
//# sourceMappingURL=auth.model.js.map