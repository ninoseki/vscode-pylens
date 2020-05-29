import * as vscode from "vscode";

import { cache } from "../common";
import { dependencyRegexp } from "../common";
import { extractDependency } from "../extractDependency";
import { getPackageInfomation } from "../package";
import { Info } from "../types";

export class AbstractProvider implements vscode.HoverProvider {
  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position, dependencyRegexp);
    const line = document.lineAt(position.line).text.trim();

    const dependency = extractDependency(line);
    if (!dependency) {
      return;
    }

    if (!cache.has(dependency.name)) {
      const info = await getPackageInfomation(dependency.name);
      if (info !== undefined) {
        cache.set(dependency.name, info);
      }
    }

    const info = cache.get(dependency.name);
    if (info === undefined) {
      return;
    }

    const message = this.buildMessage(info);
    const link = new vscode.Hover(message, range);
    return link;
  }

  public buildMessage(info: Info): string {
    return `${info.summary}\n\nLatest version: ${info.version}\n\n${info.home_page}`;
  }
}
