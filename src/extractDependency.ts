import { packageNameRegexp, packageRequirementsRegexp } from "./common";
import { Dependency } from "./types";

function isDependecy(line: string): boolean {
  return packageNameRegexp.test(line) && packageRequirementsRegexp.test(line);
}

export function extractDependency(line: string): Dependency | undefined {
  if (!isDependecy(line.trim())) {
    return undefined;
  }

  const packageName = packageNameRegexp.exec(line);
  const packageRequirements = packageRequirementsRegexp.exec(line);

  if (packageName === null || packageName.length !== 2) {
    return undefined;
  }

  if (packageRequirements === null || packageRequirements.length !== 2) {
    return undefined;
  }

  const name = packageName[1];
  const requirements = packageRequirements[1];

  return { name, requirements };
}
