describe("dependency CVE fixes", () => {
  const parse = (version: string): number[] =>
    version.split(".").map((part) => parseInt(part, 10));

  it("uses zod >= 4.6.6 (GHSA-mrhx-c7xc-m3w5)", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { version } = require("zod/package.json");
    const [major, minor, patch] = parse(version);
    expect(major).toBe(4);
    expect(minor > 6 || (minor === 6 && patch >= 6)).toBe(true);
  });

  it("uses body-parser >= 2.4.0 (GHSA-27r3-jxmh-p828)", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { version } = require("body-parser/package.json");
    const [major, minor] = parse(version);
    expect(major).toBe(2);
    expect(minor >= 4).toBe(true);
  });
});
