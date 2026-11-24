import fs from "fs";
import path from "path";

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type LockPackage = {
  version?: string;
  resolved?: string;
};

type PackageLock = {
  packages?: Record<string, LockPackage>;
};

const repoRoot = path.resolve(__dirname, "../../../..");

function readJson<T>(relativePath: string): T {
  return JSON.parse(
    fs.readFileSync(path.resolve(repoRoot, relativePath), "utf8"),
  ) as T;
}

function parseVersion(range: string): [number, number, number] {
  const match = range.match(/(\d+)\.(\d+)\.(\d+)/);

  if (!match) {
    throw new Error(`Unsupported version range: ${range}`);
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function isAtLeast(actual: string | undefined, minimum: [number, number, number]) {
  if (!actual) {
    return false;
  }

  const current = parseVersion(actual);

  for (let i = 0; i < minimum.length; i += 1) {
    if (current[i] !== minimum[i]) {
      return current[i] > minimum[i];
    }
  }

  return true;
}

describe("@hookform/resolvers API version", () => {
  it("pins the v7 release used by the zod resolver call sites", () => {
    const frontendPackage = readJson<PackageJson>("frontend/package.json");
    const frontendLock = readJson<PackageLock>("frontend/package-lock.json");

    const declared = {
      ...frontendPackage.dependencies,
      ...frontendPackage.devDependencies,
    }["@hookform/resolvers"];

    expect(isAtLeast(declared, [7, 0, 9])).toBe(true);

    const locked = frontendLock.packages?.["node_modules/@hookform/resolvers"];

    expect(isAtLeast(locked?.version, [7, 0, 9])).toBe(true);
    expect(locked?.resolved).toContain("resolvers-7.0.9.tgz");

    for (const page of [
      "frontend/src/pages/Login.tsx",
      "frontend/src/pages/Register.tsx",
    ]) {
      const source = fs.readFileSync(path.resolve(repoRoot, page), "utf8");

      expect(source).toContain(
        'import { zodResolver } from "@hookform/resolvers/zod";',
      );
      expect(source).toContain("zodResolver(");
    }
  });
});
