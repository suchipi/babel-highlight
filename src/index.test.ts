import { test, expect } from "vitest";
import highlight from "./index";
import kleur from "kleur";

const code = `
const something = 5;
console.log("hello there!")
`.trim();

test("highlight - tag styles", () => {
  const tagStyles = {
    keyword: (str: string) => `<keyword>${str}</keyword>`,
    capitalized: (str: string) => `<capitalized>${str}</capitalized>`,
    jsxIdentifier: (str: string) => `<jsxIdentifier>${str}</jsxIdentifier>`,
    punctuator: (str: string) => `<punctuator>${str}</punctuator>`,
    number: (str: string) => `<number>${str}</number>`,
    string: (str: string) => `<string>${str}</string>`,
    regex: (str: string) => `<regex>${str}</regex>`,
    comment: (str: string) => `<comment>${str}</comment>`,
    invalid: (str: string) => `<invalid>${str}</invalid>`,
  };

  const result = highlight(code, tagStyles);
  expect(result).toMatchInlineSnapshot(`
    "<keyword>const</keyword> something <punctuator>=</punctuator> <number>5</number><punctuator>;</punctuator>
    console<punctuator>.</punctuator>log(<string>\\"hello there!\\"</string>)"
  `);
});

test("highlight - ansi color styles", () => {
  kleur.enabled = true;
  const colorStyles = {
    keyword: kleur.white,
    capitalized: kleur.blue,
    jsxIdentifier: kleur.green,
    punctuator: kleur.red,
    number: kleur.magenta,
    string: kleur.bgYellow().black,
    regex: kleur.bgYellow().red,
    comment: kleur.dim,
    invalid: kleur.bgRed().white,
  };

  const result = highlight(code, colorStyles);
  expect(result).toMatchInlineSnapshot(`
    "[37mconst[39m something [31m=[39m [35m5[39m[31m;[39m
    console[31m.[39mlog([43m[30m\\"hello there!\\"[49m[39m)"
  `);
});
