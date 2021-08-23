"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// file.js
const fs = __importStar(require("fs"));
const util_1 = require("util");
const writeFilePromise = util_1.promisify(fs.writeFile);
const readFilePromise = util_1.promisify(fs.readFile);
const save = (path, str) => writeFilePromise(path, str);
const read = (path) => readFilePromise(path);
module.exports = {
    read: read,
    save: save
};
