import * as vscode from "vscode";

import { AbstractProvider } from "./providers/abstractProvider";

export function activate(context: vscode.ExtensionContext): void {
  const pyprojectToml: vscode.DocumentFilter = {
    pattern: "**/pyproject.toml",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      pyprojectToml,
      new AbstractProvider()
    )
  );

  const requirements: vscode.DocumentFilter = {
    pattern: "**/requirements.txt",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(requirements, new AbstractProvider())
  );

  const requirementsEtc: vscode.DocumentFilter = {
    pattern: "**/requirements-*.txt",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      requirementsEtc,
      new AbstractProvider()
    )
  );

  const requirementsEtc2: vscode.DocumentFilter = {
    pattern: "**/*-requirements.txt",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      requirementsEtc2,
      new AbstractProvider()
    )
  );

  const requirementsSubDirectory: vscode.DocumentFilter = {
    pattern: "**/requirements/*.txt",
    scheme: "file",
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      requirementsSubDirectory,
      new AbstractProvider()
    )
  );
}

export function deactivate(): void {
  return;
}
