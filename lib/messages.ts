export const errors: InputError[] = [
  {
    code: 0,
    message: "Empty Input. Run the app with the '-h' flag for more information."
  },
  {
    code: 1,
    message: "Invalid Input: Please check that only numbers or accepted operators have been supplied. Run the '-h' flag for more information."
  },
  {
    code: 2,
    message: "Invalid Expression: The expression is likely badly formatted or contains the wrong number of operators. Run the app with the '-h' flag for more information."
  }
];

export const flagMessages: string[] = [
  "The current expression has been cleared.",
  `Welcome to RPN Calculator
    This is a simple command line utility for evaluating
    Reverse Polish Notation expressions.

    Usage:

    - Input can be any quantity of numbers and operators,
    separated by spaces. You can enter single numbers or
    operators individually or complete expressions, though an
    error will be thrown if the expression can't be further
    evaluated. (For instance an incorrect remainder of
    operators)

    - Supported Operators: + - / *

    - Supported Flags:
    -h, --Help: Shows this message.
    -c, --Clear: Clear the current expression.
    -l, --List: Print the current expression.
    -q, --Quit: Quit the program.
    
    Enter an expression to get started:`,
  "Goodbye"
];
