"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = exports.authSchema = void 0;
const mongoose = require("mongoose");
var Role;
(function (Role) {
    Role["AVTASH"] = "AVTASH";
    Role["CLEAN"] = "CLEAN";
    Role["NIGHT"] = "NIGHT";
})(Role || (Role = {}));
exports.authSchema = new mongoose.Schema({
    username: { type: String, required: true },
    hash: { type: String, required: true },
});
exports.TaskSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    date: { type: Number, required: true },
    type: { type: String, enum: Role, required: true },
});
//# sourceMappingURL=auth.model.js.map