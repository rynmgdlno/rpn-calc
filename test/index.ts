// Simple DIY Testing Suite

export const describe = (desc: string, func: Function) => {
  console.log(desc);
  func();
};

export const it = (message: string, func: Function) => {
  describe(`  ${message}`, func);
};

export const expect = (input: any) => matchers(input);

export const matchers = (value: any) => ({
  toBe: (assertion: any) => {
    if (value == assertion) {
      console.log("pass");
      return true;
    } else {
      console.log("fail");
      return false;
    }
  }
});
