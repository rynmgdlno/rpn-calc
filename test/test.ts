import { describe, it, expect } from "./index";
import { handleFlags, parse } from "../lib/core";
import { operators } from "../lib/operators";

// Testing core functions:

describe("parse", () => {
  it("should properly tokenize the string input", () => {
    const result = parse("6 5 4 + -");
    expect(JSON.stringify(result)).toBe(
      JSON.stringify(["6", "5", "4", "+", "-"])
    );
  });
});

// Testing operators:

describe("+", () => {
  it("should add two numbers", () => {
    const result = operators["+"](3, 4);
    expect(result).toBe(7);
  });
});

describe("-", () => {
  it("should subtract b from a", () => {
    const result = operators["-"](3, 4);
    expect(result).toBe(-1);
  });
});

describe("*", () => {
  it("should multiply two numbers", () => {
    const result = operators["*"](3, 4);
    expect(result).toBe(12);
  });
});

describe("/", () => {
  it("should divide a by b", () => {
    const result = operators["/"](6, 2);
    expect(result).toBe(3);
  });
});
