import * as semver from "semver";
import * as vscode from "vscode";

import { Dependency, Package } from "@/types";

export class SuggestionProvider {
  private dependency: Dependency;
  private pkg: Package;

  constructor(dependency: Dependency, pkg: Package) {
    this.dependency = dependency;
    this.pkg = pkg;
  }

  public suggest(): vscode.Command {
    if (this.isLatest()) {
      return { title: "latest", command: "" };
    }
    return { title: `latest: ${this.pkg.info.version}`, command: "" };
  }

  private isLatest(): boolean {
    if (this.dependency.requirements === this.pkg.info.version) {
      return true;
    }

    if (!this.dependency.requirements) {
      return false;
    }

    try {
      const v1 = semver.clean(this.dependency.requirements);
      if (!v1) {
        return false;
      }

      const v2 = semver.clean(this.pkg.info.version);
      if (!v2) {
        return false;
      }

      return semver.eq(v1, v2);
    } catch (_err) {
      return false;
    }
  }
}
