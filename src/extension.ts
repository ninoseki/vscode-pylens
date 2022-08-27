import * as vscode from "vscode";

import { AbstractProvider } from "./providers/abstractProvider";

export function activate(context: vscode.ExtensionContext): void {
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
  ];
  const provider = new AbstractProvider();

  filters.forEach((filter) => {
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(filter, provider)
    );
  });
}

export function deactivate(): void {
  return;
}
