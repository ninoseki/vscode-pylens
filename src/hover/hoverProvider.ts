import * as vscode from "vscode";

import { dependencyRegexp } from "@/common";
import { extractDependency } from "@/extractDependency";
import { buildHoverMessage, getPackage } from "@/package";

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

    const message = buildHoverMessage(pkg);
    const link = new vscode.Hover(message, range);
    return link;
  }
}
