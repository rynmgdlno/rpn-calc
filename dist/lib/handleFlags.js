"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFlags = void 0;
const commandLineFlags_1 = require("./commandLineFlags");
const messages_1 = require("./messages");
const handleFlags = (includesFloat, input, stack) => {
    if (input === "-c" || input === "--Clear") {
        stack = commandLineFlags_1.flagFuncs.clear(messages_1.flagMessages[0]);
        includesFloat = false;
        return;
    }
    if (input === "-h" || input === "--Help") {
        commandLineFlags_1.flagFuncs.help(messages_1.flagMessages[1]);
        return;
    }
    if (input === "-l" || input === "--List") {
        commandLineFlags_1.flagFuncs.list(stack);
        return;
    }
    if (input === "-q" || input === "--Quit") {
        commandLineFlags_1.flagFuncs.quit(messages_1.flagMessages[2]);
        return;
    }
};
exports.handleFlags = handleFlags;
//# sourceMappingURL=handleFlags.js.map