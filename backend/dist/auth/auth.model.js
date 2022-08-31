"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = exports.authSchema = void 0;
const mongoose = require("mongoose");
var Role;
(function (Role) {
    Role[Role["AVTASH"] = 25] = "AVTASH";
    Role[Role["CLEAN"] = 2] = "CLEAN";
    Role[Role["NIGHT"] = 5] = "NIGHT";
    Role[Role["HANFZA"] = 10] = "HANFZA";
})(Role || (Role = {}));
exports.authSchema = new mongoose.Schema({
    username: { type: String, required: true },
    hash: { type: String, required: true },
});
exports.TaskSchema = new mongoose.Schema({
    date: { type: Number, required: true },
    type: { type: String, enum: Role, required: true },
});
//# sourceMappingURL=auth.model.js.map