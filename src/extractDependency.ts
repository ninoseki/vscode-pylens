import { dependencyRegexp } from "./common";
import { Dependency } from "./types";

function isDependecy(line: string): boolean {
  return dependencyRegexp.test(line);
}

export function extractDependency(line: string): Dependency | undefined {
  if (!isDependecy(line.trim())) {
    return undefined;
  }

  const parts = dependencyRegexp.exec(line);
  if (parts === null || parts.length !== 3) {
    return undefined;
  }

  const name = parts[1];
  const requirements = parts[2];

  return { name, requirements };
}
