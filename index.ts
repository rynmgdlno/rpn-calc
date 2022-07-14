import { calc, formatOutput, handleFlags, parse } from "./lib/core";
import { flagMessages } from "./lib/messages";
import { printMessage } from "./lib/util";

// tracking if a value is a float for output formatting purposes
let includesFloat = false;
// storing all operands in stack
let stack: number[] = [];

// setter for float bool:
const setIncludesFloat = (isFloat: boolean) => {
  const newFloat = isFloat;
  includesFloat = newFloat;
}

// main process:
const app = (input: string) => {
  try {
    const tokens: string[] = parse(input)!;
    input.toString().split(" ");
    handleFlags(setIncludesFloat, input, stack);
    calc(setIncludesFloat, stack, tokens);
    formatOutput(includesFloat, stack);
  } catch (err) {
    if (err instanceof Error) return;
  }
};

// command line functionality driver:
process.stdin.resume();
printMessage(flagMessages[1]);
process.stdin.on("data", data => {
  app(data.toString());
});
