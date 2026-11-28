import fs from "fs";
import path from "path";
import request from "supertest";
import app from "../../app";

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type PackageLock = {
  packages?: Record<string, { version?: string }>;
};

type Version = [number, number, number];

const repoRoot = path.resolve(__dirname, "../../../..");

function readJson<T>(relativePath: string): T {
  return JSON.parse(
    fs.readFileSync(path.resolve(repoRoot, relativePath), "utf8"),
  ) as T;
}

function parseVersion(range: string): Version {
  const match = range.match(/(\d+)\.(\d+)\.(\d+)/);

  if (!match) {
    throw new Error(`Unsupported version range: ${range}`);
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function isAtLeast(actual: string | undefined, minimum: Version): boolean {
  if (!actual) {
    return false;
  }

  const [actualMajor, actualMinor, actualPatch] = parseVersion(actual);
  const [minMajor, minMinor, minPatch] = minimum;

  if (actualMajor !== minMajor) {
    return actualMajor > minMajor;
  }

  if (actualMinor !== minMinor) {
    return actualMinor > minMinor;
  }

  return actualPatch >= minPatch;
}

function lockedVersion(lockfile: PackageLock, packageName: string) {
  return lockfile.packages?.[`node_modules/${packageName}`]?.version;
}

describe("dependency API versions", () => {
  it("uses the resolver, icon and security releases required by the current APIs", async () => {
    const frontendPackage = readJson<PackageJson>("frontend/package.json");
    const backendPackage = readJson<PackageJson>("backend/package.json");
    const frontendLock = readJson<PackageLock>("frontend/package-lock.json");
    const backendLock = readJson<PackageLock>("backend/package-lock.json");

    const frontendDependencies = {
      ...frontendPackage.dependencies,
      ...frontendPackage.devDependencies,
    };
    const backendDependencies = {
      ...backendPackage.dependencies,
      ...backendPackage.devDependencies,
    };

    expect(isAtLeast(frontendDependencies["@hookform/resolvers"], [7, 0, 8])).toBe(
      true,
    );
    expect(isAtLeast(frontendDependencies["lucide-react"], [1, 74, 0])).toBe(
      true,
    );
    expect(isAtLeast(backendDependencies.helmet, [8, 0, 0])).toBe(true);

    expect(
      isAtLeast(lockedVersion(frontendLock, "@hookform/resolvers"), [7, 0, 8]),
    ).toBe(true);
    expect(isAtLeast(lockedVersion(frontendLock, "lucide-react"), [1, 74, 0])).toBe(
      true,
    );
    expect(isAtLeast(lockedVersion(backendLock, "helmet"), [8, 0, 0])).toBe(true);

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
  });
});
