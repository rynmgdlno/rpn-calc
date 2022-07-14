"use strict";
// Utility printing functions to help with formatting
Object.defineProperty(exports, "__esModule", { value: true });
exports.printMessage = exports.printError = void 0;
const printError = (error) => {
    console.log("\x1b[31m%s\x1b[0m", `ERROR code: ${error.code}: Message: ${error.message}`);
};
exports.printError = printError;
const printMessage = (message) => {
    console.log("\x1b[34m%s\x1b[0m", message);
};
exports.printMessage = printMessage;
//# sourceMappingURL=util.js.map