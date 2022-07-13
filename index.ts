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
    console.log('Empty input');
    return;
  }

  // verifying supported input:
  if (
    isNaN(parseInt(input)) &&
    !['-', '+', '/', '*'].includes(input) 
  ) {
    console.log('Invalid input')
    return;
  }

  for (let i = 0; i < tokens.length; i++) {
    const val = tokens[i].trim();
    // todo: convert to switch?
    if (
      val.includes(".") &&
      typeof parseInt(val) === "number" &&
      !isNaN(parseInt(val))
    ) {
      includesFloat = true;
      stack.push(parseFloat(val));
    } else if (typeof parseInt(val) === "number" && !isNaN(parseInt(val))) {
      stack.push(parseInt(val, 10));
    } else if (['-', '+', '/', '*'].includes(val)) {
      if (stack.length) {
        stack.push(operators[val](stack.pop(), stack.pop()));
      } else {
        console.log('Invalid expression')
      }
    }
  }

  // formatting output to maintain float
  // decimal syntax per requirement example
  if (
    stack.length === 1 &&
    includesFloat &&
    !stack[0].toString().includes(".")
  ) {
    console.log(`${stack[0]}.0`);
  } else {
    console.log(`${stack}`);
  }
};

parse('8 9 3 5 2 - - + *')
