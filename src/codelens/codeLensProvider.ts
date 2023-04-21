import { getDependenciesFrom } from "snyk-poetry-lockfile-parser/dist/manifest-parser";
import * as vscode from "vscode";

import { dependencyRegexp } from "@/common";
import { ENABLE_CODE_LENS_KEY, EXT_ID } from "@/constants";
import { extractDependency } from "@/extractDependency";
import { getPackage } from "@/package";
import { SuggestionProvider } from "@/suggestion/suggestionProvider";

export class CodeLensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];

  private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> =
    this._onDidChangeCodeLenses.event;

  private regexp: RegExp;

  constructor(regexp = dependencyRegexp) {
    this.regexp = regexp;

    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public async provideCodeLenses(
    document: vscode.TextDocument,
    _token: vscode.CancellationToken
  ) {
    this.codeLenses = [];

    const enabled = vscode.workspace
      .getConfiguration(EXT_ID)
      .get(ENABLE_CODE_LENS_KEY, true);

    if (!enabled) {
      return this.codeLenses;
    }

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const matches = this.regexp.exec(line.text.trim());
      if (!matches) {
        continue;
      }

      const dependency = extractDependency(line.text.trim());
      if (!dependency) {
        continue;
      }

      const isPyproject = document.fileName.endsWith("/pyproject.toml");

      if (isPyproject) {
        const pyprojectDependencies = getDependenciesFrom(
          document.getText(),
          true
        );
        const found: boolean =
          pyprojectDependencies.find((d) => d.name === dependency.name) !==
          undefined;

        if (!found) {
          continue;
        }
      }

      const pkg = await getPackage(dependency.name);
      if (!pkg) {
        continue;
      }

      const indexOf = line.text.indexOf(matches[0]);
      const position = new vscode.Position(line.lineNumber, indexOf);
      const range = document.getWordRangeAtPosition(position, this.regexp);

      if (range) {
        const codeLens = new vscode.CodeLens(range);
        const suggestionProvider = new SuggestionProvider(dependency, pkg);
        codeLens.command = suggestionProvider.suggest();
        this.codeLenses.push(codeLens);
      }
    }

    return this.codeLenses;
  }
}
