import * as vscode from "vscode";

import { CodeLensProvider } from "@/codelens/codeLensProvider";
import { ENABLE_CODE_LENS_KEY, EXT_ID } from "@/constants";
import { HoverProvider } from "@/hover/hoverProvider";

export function activate(context: vscode.ExtensionContext): void {
  vscode.commands.registerCommand(`${EXT_ID}.enableCodeLens`, () => {
    void vscode.workspace
      .getConfiguration(EXT_ID)
      .update(ENABLE_CODE_LENS_KEY, true, true);
  });

  vscode.commands.registerCommand(`${EXT_ID}.disableCodeLens`, () => {
    void vscode.workspace
      .getConfiguration(EXT_ID)
      .update(ENABLE_CODE_LENS_KEY, false, true);
  });

  const filters: vscode.DocumentFilter[] = [
    {
      pattern: "**/pyproject.toml",
      scheme: "file",
    },
    {
      pattern: "**/requirements.txt",
      scheme: "file",
    },
    {
      pattern: "**/requirements-*.txt",
      scheme: "file",
    },
    {
      pattern: "**/requirements/*.txt",
      scheme: "file",
    },
    {
      pattern: "**/*-requirements.txt",
      scheme: "file",
    },
  ];
  const hoverProvider = new HoverProvider();
  const codeLensProvider = new CodeLensProvider();

  filters.forEach((filter) => {
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(filter, hoverProvider)
    );

    context.subscriptions.push(
      vscode.languages.registerCodeLensProvider(filter, codeLensProvider)
    );
  });
}

export function deactivate(): void {
  return;
}
