"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const core_1 = require("../lib/core");
const operators_1 = require("../lib/operators");
// Testing core functions:
(0, index_1.describe)("parse", () => {
    (0, index_1.it)("should properly tokenize the string input", () => {
        const result = (0, core_1.parse)("6 5 4 + -");
        (0, index_1.expect)(JSON.stringify(result)).toBe(JSON.stringify(["6", "5", "4", "+", "-"]));
    });
});
// Testing operators:
(0, index_1.describe)("+", () => {
    (0, index_1.it)("should add two numbers", () => {
        const result = operators_1.operators["+"](3, 4);
        (0, index_1.expect)(result).toBe(7);
    });
});
(0, index_1.describe)("-", () => {
    (0, index_1.it)("should subtract b from a", () => {
        const result = operators_1.operators["-"](3, 4);
        (0, index_1.expect)(result).toBe(-1);
    });
});
(0, index_1.describe)("*", () => {
    (0, index_1.it)("should multiply two numbers", () => {
        const result = operators_1.operators["*"](3, 4);
        (0, index_1.expect)(result).toBe(12);
    });
});
(0, index_1.describe)("/", () => {
    (0, index_1.it)("should divide a by b", () => {
        const result = operators_1.operators["/"](6, 2);
        (0, index_1.expect)(result).toBe(3);
    });
});
//# sourceMappingURL=test.js.map