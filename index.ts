import { flagFuncs } from "./lib/commandLineFlags";
import { supportedFlags, supportedOperators } from "./lib/constants";
import { errors, flagMessages } from "./lib/messages";
import { printError, printMessage } from "./lib/util";

export const operators: { [key: string]: Function } = {
  "+": (a: number, b: number) => b + a,
  "-": (a: number, b: number) => b - a,
  "*": (a: number, b: number) => b * a,
  "/": (a: number, b: number) => b / a
};

let stack: number[] = [];
let includesFloat = false;

export const parse = (input: string) => {
  let tokens = input.toString().split(" ");
  input = input.trim();

  // non expression input handling:
  // verifying non empty input:
  if (input.length === 0) {
    printError(errors[0]);
    return;
  }

  // verifying supported input:
  if (
    isNaN(parseInt(input)) &&
    !supportedOperators.includes(input) &&
    !supportedFlags.includes(input)
  ) {
    printError(errors[1]);
    return;
  }

  // handling command line flags:
  if (input === "-c" || input === "--Clear") {
    stack = flagFuncs.clear(flagMessages[0]);
    includesFloat = false;
    return;
  }

  if (input === "-h" || input === "--Help") {
    flagFuncs.help(flagMessages[1]);
    return;
  }

  if (input === "-l" || input === "--List") {
    flagFuncs.list(stack);
    return;
  }

  if (input === "-q" || input === "--Quit") {
    flagFuncs.quit(flagMessages[2]);
    return;
  }

  for (let i = 0; i < tokens.length; i++) {
    const val = tokens[i].trim();
    if (
      val.includes(".") &&
      typeof parseInt(val) === "number" &&
      !isNaN(parseInt(val))
    ) {
      includesFloat = true;
      stack.push(parseFloat(val));
    } else if (typeof parseInt(val) === "number" && !isNaN(parseInt(val))) {
      stack.push(parseInt(val, 10));
    } else if (["-", "+", "/", "*"].includes(val)) {
      if (stack.length) {
        stack.push(operators[val](stack.pop(), stack.pop()));
      } else {
        printError(errors[2]);
      }
    }
  }

  // formatting output to maintain float
  // decimal syntax per requirement example:
  if (
    stack.length === 1 &&
    includesFloat &&
    !stack[0].toString().includes(".")
  ) {
    console.log(`>> ${stack[0]}.0`);
  } else {
    console.log(`>> ${stack}`);
  }
};

// command line functionality driver:
process.stdin.resume();
printMessage(flagMessages[1])
process.stdin.on("data", data => {
  parse(data.toString());
});
