import * as vscode from "vscode";

import { dependencyRegexp } from "../common";
import { extractDependency } from "../extractDependency";
import { getPackageInformation } from "../package";
import { Info } from "../types";

export class AbstractProvider implements vscode.HoverProvider {
  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position, dependencyRegexp);
    const line = document.lineAt(position.line).text.trim();

    const dependency = extractDependency(line);
    if (!dependency) {
      return;
    }

    const info = await getPackageInformation(dependency.name);
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
