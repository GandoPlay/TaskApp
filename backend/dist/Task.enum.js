"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDictionary = exports.Rank = exports.Role = void 0;
var Role;
(function (Role) {
    Role["AVTASH"] = "\u05D0\u05D1\u05D8\u05E9";
    Role["CLEAN"] = "\u05E0\u05D9\u05E7\u05D9\u05D5\u05DF";
    Role["NIGHT"] = "\u05DC\u05D9\u05DC\u05D4";
    Role["HANFZA"] = "\u05D4\u05E0\u05E4\u05E6\u05D4";
})(Role = exports.Role || (exports.Role = {}));
var Rank;
(function (Rank) {
    Rank["NOTHING"] = "\u05E9\u05D5\u05DE\u05E8 \u05E9\u05D7\u05E8";
    Rank["YOUNG"] = "\u05E9\u05D5\u05DE\u05E8 \u05E6\u05E2\u05D9\u05E8";
    Rank["MID"] = "\u05E9\u05D5\u05DE\u05E8 \u05DE\u05E0\u05D5\u05E1\u05D4";
    Rank["LARGE"] = "\u05E9\u05D5\u05DE\u05E8 \u05E0\u05D8\u05D7\u05DF \u05E2\u05D5\u05D1\u05E8";
    Rank["HUGE"] = "\u05E8\u05D6 \u05DE\u05E9\u05D5\u05DC\u05DD";
})(Rank = exports.Rank || (exports.Rank = {}));
exports.taskDictionary = {
    [Role.AVTASH]: 25,
    [Role.CLEAN]: 2,
    [Role.HANFZA]: 5,
    [Role.NIGHT]: 10
};
//# sourceMappingURL=Task.enum.js.map