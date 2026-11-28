import fs from "fs";
import path from "path";

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type LockPackage = {
  version?: string;
  resolved?: string;
  integrity?: string;
};

type PackageLock = {
  packages?: Record<string, LockPackage>;
};

const repoRoot = path.resolve(__dirname, "../../../..");

const ICON_CALL_SITES = [
  "frontend/src/components/Navbar.tsx",
  "frontend/src/components/SearchBar.tsx",
  "frontend/src/components/VehicleCard.tsx",
  "frontend/src/components/VehicleForm.tsx",
  "frontend/src/pages/AddVehicle.tsx",
  "frontend/src/pages/Dashboard.tsx",
  "frontend/src/pages/EditVehicle.tsx",
  "frontend/src/pages/Login.tsx",
  "frontend/src/pages/NotFound.tsx",
  "frontend/src/pages/Register.tsx",
];

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

function isAtLeast(
  actual: string | undefined,
  minimum: [number, number, number],
): boolean {
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

describe("lucide-react icon release", () => {
  it("pins the 1.83.0 icon set used by the frontend call sites", () => {
    const frontendPackage = readJson<PackageJson>("frontend/package.json");
    const frontendLock = readJson<PackageLock>("frontend/package-lock.json");

    const declared = {
      ...frontendPackage.dependencies,
      ...frontendPackage.devDependencies,
    }["lucide-react"];

    expect(isAtLeast(declared, [1, 83, 0])).toBe(true);

    const locked = frontendLock.packages?.["node_modules/lucide-react"];

    expect(isAtLeast(locked?.version, [1, 83, 0])).toBe(true);
    expect(locked?.resolved).toContain("lucide-react-1.83.0.tgz");
    expect(locked?.integrity).toBeTruthy();

    for (const callSite of ICON_CALL_SITES) {
      const source = fs.readFileSync(path.resolve(repoRoot, callSite), "utf8");

      // Icon shape updates ship as named exports, so every call site must keep
      // importing icons by name from the package entrypoint.
      expect(source).toMatch(/import\s*\{[^}]+\}\s*from\s*"lucide-react"/);
      expect(source).not.toMatch(/import\s+\w+\s+from\s*"lucide-react"/);
    }
  });
});
