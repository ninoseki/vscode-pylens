import camelcaseKeys from "camelcase-keys";
import * as toml from "toml";

import { Project } from "./types";

export class Pyproject {
  project: Project;

  constructor(source: string) {
    this.project = <Project>camelcaseKeys(toml.parse(source), {
      deep: true,
      stopPaths: ["tool.poetry.dependencies", "tool.poetry.dev-dependencies"],
    });
  }
}
