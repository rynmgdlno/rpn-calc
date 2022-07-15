import { flagFuncs } from "./commandLineFlags";
import { supportedFlags, supportedOperators } from "./constants";
import { errors } from "./messages";
import { operators } from "./operators";
import { printError } from "./util";

// Main "calculator" function. Checks validity of input, if valid:
// push operand to stack or process operator.
export const evaluate = (stack: number[], tokens: string[]): void => {
  for (const token of tokens) {
    if (typeof parseFloat(token) === "number" && !isNaN(parseFloat(token))) {
      // pushing operand to stack:
      stack.push(parseFloat(token));
    } else if (supportedOperators.includes(token)) {
      if (stack.length > 1) {
        // retrieving in "reverse" order to maintain logical
        // readability in divide by zero check, operators calls, and funcs
        const b = stack.pop();
        const a = stack.pop();
        // prevent divide by zero:
        if (b === 0 && token === "/") {
          printError(errors[3]);
          return;
        }
        // if operator: evaluate two top most values and replace in stack with result:
        stack.push(operators[token](a, b));
      } else {
        // invalid expression:
        printError(errors[2]);
        return;
      }
    }
  }
};

/**
 * * Initially I was trying to maintain Int/Float determinations
 * * (at least in formatting) to maintain consistency with the
 * * requirements examples, but this is outside the scope of this project
 * * - - START Old Comments For Reference:
 * JS/TS uses a "number" type instead of int/float/double etc,
 * and will drop a trailing .0 even if the value is a "float". The examples
 * in the requirements display maintaining trailing .0, so this serves
 * just to keep the format consistent with the example:
 * * - - END Old Comments For Reference - - 
 */

export const formatOutput = (stack: number[]): void => {
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

// Calls the specified function based on flag input in the command line:
export const handleFlags = (input: string, stack: number[]): void => {
  const { clear, help, list, quit } = flagFuncs;
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

// checks validity of input and returns a sanitized token
// array to be further processed:
export const parse = (input: string): string[] | void => {
  input = input.trim();

  // verifying non empty input:
  if (!input.length) {
    printError(errors[0]);
    return;
  }
  // verifying supported input:
  const tokens = input.split(" ");
  for (let token of tokens) {
    if (
      isNaN(parseFloat(token)) &&
      !supportedOperators.includes(token) &&
      !supportedFlags.includes(token)
    ) {
      printError(errors[1]);
      return;
    }
    token = token.trim();
  }
  return tokens;
};
