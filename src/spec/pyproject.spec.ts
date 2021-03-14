import { Pyproject } from "../pyproject";

const source = `
[tool.poetry.dependencies]
yara-python = "^4.0.0"
aiomysql = "^0.0.20"

[tool.poetry.dev-dependencies]
autoflake = "^1.3.1"
`;

describe("Pyproject", () => {
  test("initialize", () => {
    const pyproject = new Pyproject(source);

    expect(pyproject.project.tool.poetry.dependencies).toEqual({
      aiomysql: "^0.0.20",
      "yara-python": "^4.0.0",
    });

    expect(pyproject.project.tool.poetry.devDependencies).toEqual({
      autoflake: "^1.3.1",
    });
  });
});
