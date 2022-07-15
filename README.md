# rpn-calc
### Reverse Polish Notation Command Line Calculator in Node.js / Typescript

## Usage
rpn-calc requires Node.js to run, but has 0 dependencies. The dev dependencies are only needed
if you'd like to re-transpile from the source Typescript.

To run simply clone the repository, cd into `./rpn-calc` and run `yarn start`.
The entry point is `./dist/index.js` and as such can be run directly with 
`node ./dist/index.js`.

To run the tests: `yarn test`

### Command Line Flags:
`-h`, `--Help`: Displays the introduction and help screen which contains these flags.

`-c`, `--Clear`: Clears (or resets if you will) the current expression from the stack.

`-l`, `--List`: Prints the current expression.

`-q`, `-Quit`: Force quits the program.

### Operators:
Current supported operators are: `-` `+` `/` and `*`. There is no operator precedence other than order of input.
### Examples:
The program will read numbers (int or float) in combination with any of the supported operators,
separated by spaces, in complete or partial expressions, or single characters. Enter is used to submit input. For example:
```
4 7 5 - +
>> 6


4
>> 4
7
>> 4, 7
3 5 
>> 4, 7, 3, 5
- - -
>> -5


4.5 3 *
>> 13.5
```

## Description
Node/Typescript would not usually be the first thought when tasked with a
CLI application but given the job description, potential "future requirements",
and my familiarity with it I decided it was the best option.

### Implementation
Node's native `process` is used for receiving command line input via `stdin`.  
Input is then passed to `app()` which further passes it to 4 functions: 
`handleFlags()`, which as you guessed handles the displaying/execution of command
line flags, `parse()` which sanitizes and tokenizes the input, `evaluate()` which 
handles the stack and calculations, and `formatOutput()`, which makes it look a 
little nicer. Given the linear nature of RPN expressions a stack (array) is used to store
operands. When an operator is parsed, the last two values on the stack are evaluated. 

## Issues Encountered
I made two (related) mistakes; using ES6 Modules and waiting until the end to
incorporate testing. I learned a decent amount of testing frameworks/libraries do not
play nicely with Typescript when using modules, to the point that implementing
a working solution would require complex custom configs, using Webpack, or rewriting for commonjs,
all which would require more time than I had,
but this lead to learning some new things which I consider a net +. 

As such I've implemented
a simple (and unfinished) basic testing "suite", more so to see how it would be done 
and show how it is quite simple to implement 
(though of course this would need to be much more fleshed out for complete coverage). 
I can't take any credit for it as I found a great 
article by Lachlan Miller (from the Cypress team), but given this I may build my own
minimal testing suite for my own projects where I want to use ES6 modules but incorporating
a bundler would be overkill or not desired. 

Note: The frameworks that I tried beforethis were: Jest, Jasmine, and Mocha,
and all had similar complaints about ES Modules.

**Lessons Learned:** Always incorporate testing from the beginning!

## References / Citations
As mentioned before I found some great information about building a "DIY" testing 
suite from this article:

[A Simple JavaScript test framework from scratch - Lachlan Miller](https://codeburst.io/a-simple-javascript-test-framework-from-scratch-89d6e7d22e74)

Any Information I needed regarding RPN came from [Wikipedia - Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)

And of course the docs for [Typescript](https://www.typescriptlang.org) and [Node](https://nodejs.org/en/docs/) for the odd lookup.
