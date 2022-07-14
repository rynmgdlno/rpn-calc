export const operators: { [key: string]: Function } = {
  "+": (a: number, b: number) => b + a,
  "-": (a: number, b: number) => b - a,
  "*": (a: number, b: number) => b * a,
  "/": (a: number, b: number) => b / a
};