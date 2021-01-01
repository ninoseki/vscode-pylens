import {
  bracketsRegexp,
  packageNameRegexp,
  packageRequirementsRegexp,
} from "./common";
import { Dependency } from "./types";

function isDependecy(line: string): boolean {
  return packageNameRegexp.test(line) && packageRequirementsRegexp.test(line);
}

function normalize(name: string): string {
  if (bracketsRegexp.test(name)) {
    return name.split("[")[0];
  }
  return name;
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

  const name = normalize(packageName[1]);
  const requirements = packageRequirements[1];

  return { name, requirements };
}
