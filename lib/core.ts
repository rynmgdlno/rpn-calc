import { flagFuncs } from "./commandLineFlags";
import { supportedFlags, supportedOperators } from "./constants";
import { errors, flagMessages } from "./messages";
import { operators } from "./operators";
import { printError } from "./util";

// Main calculator function. Checks validity of input, if valid
// push operand to stack or apply operator.
export const calc = (
  setIncludesFloat: Function,
  stack: number[],
  tokens: string[]
) => {
  for (let i = 0; i < tokens.length; i++) {
    const val = tokens[i].trim();
    // if float: push float and set includesFloat
    // else if int: push int
    // else if operator: apply
    if (
      val.includes(".") &&
      typeof parseInt(val) === "number" &&
      !isNaN(parseInt(val))
    ) {
      setIncludesFloat(true);
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
};

// JS/TS uses a "number" type instead of int/float etc, so
// and will drop a trailing .0 even if the value is a float. The examples
// in the requirements display maintaining trailing .0, so this serves
// just to keep the format consistent with the example:
export const formatOutput = (includesFloat: boolean, stack: number[]) => {
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

// Calls the specified function based on flag input in the command line:
export const handleFlags = (
  setIncludesFloat: Function,
  input: string,
  stack: number[]
) => {
  input = input.trim();
  if (input === "-c" || input === "--Clear") {
    stack.length = 0;
    setIncludesFloat(false);
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
};

// checks validity of input and returns a sanitized token
// array to be further processed:
export const parse = (input: string) => {
  input = input.trim();
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
  return input!.toString()!.split(" ");
};
