describe("mongoose dependency CVE fixes", () => {
  const parse = (version: string): number[] =>
    version.split(".").map((part) => parseInt(part, 10));

  it("uses mongoose >= 9.9.2 (GHSA-pcrw-h46h-c93h, GHSA-8332-j7wj-wjw4, GHSA-gg4r-jv3p-qx3c)", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { version } = require("mongoose/package.json");
    const [major, minor, patch] = parse(version);
    expect(
      major > 9 || (major === 9 && (minor > 9 || (minor === 9 && patch >= 2)))
    ).toBe(true);
  });
});
