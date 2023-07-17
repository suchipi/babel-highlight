import { test, expect, beforeEach } from "vitest";
import kleur from "kleur";
import highlight from "./index";

beforeEach(() => {
  kleur.enabled = true;
});

const code = `
const something = 5;
console.log("hello there!")
`.trim();

test("highlight", () => {
  kleur.enabled = true;
  const result = highlight(code);
  expect(result).toMatchInlineSnapshot(`
    "[36mconst[39m something [33m=[39m [35m5[39m[33m;[39m
    console[33m.[39mlog([32m\\"hello there!\\"[39m)"
  `);

  kleur.enabled = false;
  const result2 = highlight(code);
  expect(result2).toMatchInlineSnapshot(`
    "const something = 5;
    console.log(\\"hello there!\\")"
  `);
});

test("forceColor", () => {
  kleur.enabled = false;
  const result = highlight(code);
  expect(result).toMatchInlineSnapshot(`
    "const something = 5;
    console.log(\\"hello there!\\")"
  `);

  const result2 = highlight(code, { forceColor: true });
  expect(result2).toMatchInlineSnapshot(`
    "[36mconst[39m something [33m=[39m [35m5[39m[33m;[39m
    console[33m.[39mlog([32m\\"hello there!\\"[39m)"
  `);
  expect(kleur.enabled).toBe(false);
});

test("custom styles", () => {
  const myStyles = {
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

  const result = highlight(code, { styles: myStyles });
  expect(result).toMatchInlineSnapshot(`
    "<keyword>const</keyword> something <punctuator>=</punctuator> <number>5</number><punctuator>;</punctuator>
    console<punctuator>.</punctuator>log(<string>\\"hello there!\\"</string>)"
  `);
});
