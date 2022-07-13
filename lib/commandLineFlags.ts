import { printMessage } from './util'

export const flagFuncs = {
  // clears/resets the current expression stack
  clear: function(message: string|object): number[] {
    printMessage(message);
    return [];
  },
  // prints help guide
  help: function(message: string|object): void {
    printMessage(message);
  },
  // prints current expression stack
  list: function(message: string|object): void {
    printMessage(message);
  },
  // force exits program
  quit: function(message: string|object): void {
    printMessage(message);
    process.exit(0);
  }
};
