"use strict";
// Simple DIY Testing Suite
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchers = exports.expect = exports.it = exports.describe = void 0;
const describe = (desc, func) => {
    console.log(desc);
    func();
};
exports.describe = describe;
const it = (message, func) => {
    (0, exports.describe)(`  ${message}`, func);
};
exports.it = it;
const expect = (input) => (0, exports.matchers)(input);
exports.expect = expect;
const matchers = (value) => ({
    toBe: (assertion) => {
        if (value == assertion) {
            console.log("pass");
            return true;
        }
        else {
            console.log("fail");
            return false;
        }
    }
});
exports.matchers = matchers;
//# sourceMappingURL=index.js.map