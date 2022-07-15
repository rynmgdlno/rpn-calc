// Utility printing functions to help with formatting

export const printError = (error: InputError): void => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    `ERROR code: ${error.code}: Message: ${error.message}`
  );
};

export const printMessage = (message: string | object): void => {
  console.log("\x1b[34m%s\x1b[0m", message);
};
