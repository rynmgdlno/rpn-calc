import { flagMessages } from './messages';
import { printMessage } from './util'

// Command line flag functions:
export const flagFuncs = {
  // clears/resets the current expression stack
  clear: function(stack: number[]): void {
    stack.length = 0;
    printMessage(flagMessages[0]);
  },
  // prints help guide
  help: function(): void {
    printMessage(flagMessages[1]);
  },
  // prints current expression stack
  list: function(stack: number[]): void {
    printMessage(stack);
  },
  // force exits program
  quit: function(): void {
    printMessage(flagMessages[2]);
    process.exit(0);
  }
};
