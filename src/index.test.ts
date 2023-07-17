import { test, expect, beforeEach } from "vitest";
import kleur from "kleur";
import highlight from "./index";

beforeEach(() => {
  kleur.enabled = true;
});

test("highlight", () => {
  const code = `
    const something = 5;
    console.log("hello there!")
  `;
  kleur.enabled = true;
  const result = highlight(code);
  expect(result).toMatchInlineSnapshot(`
    "
        [36mconst[39m something [33m=[39m [35m5[39m[33m;[39m
        console[33m.[39mlog([32m\\"hello there!\\"[39m)
      "
  `);

  kleur.enabled = false;
  const result2 = highlight(code);
  expect(result2).toMatchInlineSnapshot(`
    "
        const something = 5;
        console.log(\\"hello there!\\")
      "
  `);
});

test("forceColor", () => {
  const code = `
    const something = 5;
    console.log("hello there!")
  `;
  kleur.enabled = false;
  const result = highlight(code);
  expect(result).toMatchInlineSnapshot(`
    "
        const something = 5;
        console.log(\\"hello there!\\")
      "
  `);

  const result2 = highlight(code, { forceColor: true });
  expect(result2).toMatchInlineSnapshot(`
    "
        [36mconst[39m something [33m=[39m [35m5[39m[33m;[39m
        console[33m.[39mlog([32m\\"hello there!\\"[39m)
      "
  `);
  expect(kleur.enabled).toBe(false);
});
