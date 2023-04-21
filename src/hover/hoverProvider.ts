import * as vscode from "vscode";

import { dependencyRegexp } from "@/common";
import { extractDependency } from "@/extractDependency";
import { getPackage } from "@/package";
import { Package } from "@/types";

export class HoverProvider implements vscode.HoverProvider {
  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position, dependencyRegexp);
    const line = document.lineAt(position.line).text.trim();

    const dependency = extractDependency(line);
    if (!dependency) {
      return;
    }

    const pkg = await getPackage(dependency.name);
    if (!pkg) {
      return;
    }

    const message = this.buildMessage(pkg);
    const link = new vscode.Hover(message, range);
    return link;
  }

  public buildMessage(pkg: Package): string {
    return `${pkg.info.summary}\n\nLatest version: ${pkg.info.version}\n\n${pkg.info.home_page}`;
  }
}
