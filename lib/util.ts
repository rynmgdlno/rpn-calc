export const printMessage = (message: string|object) => {
  console.log("\x1b[34m%s\x1b[0m", message);
};