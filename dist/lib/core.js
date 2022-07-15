"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.handleFlags = exports.formatOutput = exports.evaluate = void 0;
const commandLineFlags_1 = require("./commandLineFlags");
const constants_1 = require("./constants");
const messages_1 = require("./messages");
const operators_1 = require("./operators");
const util_1 = require("./util");
// Main "calculator" function. Checks validity of input, if valid:
// push operand to stack or apply operator.
const evaluate = (stack, tokens) => {
    for (const token of tokens) {
        token.trim();
        if (typeof parseFloat(token) === "number" && !isNaN(parseFloat(token))) {
            // pushing operand to stack:
            stack.push(parseFloat(token));
        }
        else if (["-", "+", "/", "*"].includes(token)) {
            if (stack.length) {
                // retrieving in reverse in order to maintain logical
                // readability in divide by zero check, operators call, and funcs
                const b = stack.pop();
                const a = stack.pop();
                // prevent divide by zero:
                if (b === 0 && token === "/") {
                    (0, util_1.printError)(messages_1.errors[3]);
                    return;
                }
                // if operator: evaluate two top most values and replace in stack with result:
                stack.push(operators_1.operators[token](a, b));
            }
            else {
                // invalid expression:
                (0, util_1.printError)(messages_1.errors[2]);
            }
        }
    }
};
exports.evaluate = evaluate;
// * Initially was trying to maintain Int/Float determinations
// * to maintain consistency with requirements examples
// * but this is outside the scope of this project
// * - - START Old Comments For Reference:
// JS/TS uses a "number" type instead of int/float/double etc,
// and will drop a trailing .0 even if the value is a "float". The examples
// in the requirements display maintaining trailing .0, so this serves
// just to keep the format consistent with the example:
// * - - END Old Comments For Reference - -
const formatOutput = (stack) => {
    console.log("\x1b[33m%s\x1b[0m", `>> ${stack}`);
    // if (
    //   stack.length === 1 &&
    //   !stack[0].toString().includes(".")
    // ) {
    //   console.log(`>> ${stack[0]}.0`);
    // } else {
    //   console.log(`>> ${stack}`);
    // }
};
exports.formatOutput = formatOutput;
// Calls the specified function based on flag input in the command line:
const handleFlags = (input, stack) => {
    const { clear, help, list, quit } = commandLineFlags_1.flagFuncs;
    input = input.trim();
    switch (input) {
        case "-c":
        case "--Clear":
            clear(stack);
            return;
        case "-h":
        case "--Help":
            help();
            return;
        case "-l":
        case "--List":
            list(stack);
            return;
        case "-q":
        case "--Quit":
            quit();
            return;
        default:
            return;
    }
};
exports.handleFlags = handleFlags;
// checks validity of input and returns a sanitized token
// array to be further processed:
const parse = (input) => {
    input = input.trim();
    // verifying non empty input:
    if (!input.length) {
        (0, util_1.printError)(messages_1.errors[0]);
        return;
    }
    // verifying supported input:
    const tokens = input.split(" ");
    for (const token of tokens) {
        if (isNaN(parseFloat(token)) &&
            !constants_1.supportedOperators.includes(token) &&
            !constants_1.supportedFlags.includes(token)) {
            (0, util_1.printError)(messages_1.errors[1]);
            return;
        }
    }
    return tokens;
};
exports.parse = parse;
//# sourceMappingURL=core.js.map