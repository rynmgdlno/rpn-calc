import { evaluate, formatOutput, handleFlags, parse } from "./lib/core";
import { flagMessages } from "./lib/messages";
import { printMessage } from "./lib/util";

// setting up stack to store operands.
// Outside of app() scope to maintain values on successive calls to app()
let stack: number[] = [];

// main process:
const app = (input: string): void => {
  try {
    handleFlags(input, stack);
    evaluate(stack, parse(input)!);
    formatOutput(stack);
  } catch (err) {
    if (err instanceof Error) return;
  }
};

// command line functionality driver:
process.stdin.resume(); // starts reading stdin
printMessage(flagMessages[1]); // prints help message on start
process.stdin.on("data", data => {
  // passing input to app(), converting buffer > string
  app(data.toString());
});
