"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calc = void 0;
const messages_1 = require("./messages");
const operators_1 = require("./operators");
const util_1 = require("./util");
const calc = (includesFloat, stack, tokens) => {
    for (let i = 0; i < tokens.length; i++) {
        const val = tokens[i].trim();
        if (val.includes(".") &&
            typeof parseInt(val) === "number" &&
            !isNaN(parseInt(val))) {
            includesFloat = true;
            stack.push(parseFloat(val));
        }
        else if (typeof parseInt(val) === "number" && !isNaN(parseInt(val))) {
            stack.push(parseInt(val, 10));
        }
        else if (["-", "+", "/", "*"].includes(val)) {
            if (stack.length) {
                stack.push(operators_1.operators[val](stack.pop(), stack.pop()));
            }
            else {
                (0, util_1.printError)(messages_1.errors[2]);
            }
        }
    }
};
exports.calc = calc;
//# sourceMappingURL=calc.js.map