/* eslint-disable jest/no-conditional-expect */
import { extractDependency } from "../extractDependency";

test("extractDependency", () => {
  let line = 'autoflake = "^1.3.1"';
  let dependency = extractDependency(line);
  expect(dependency).toBeDefined();
  if (dependency) {
    expect(dependency.name).toEqual("autoflake");
    expect(dependency.requirements).toEqual("1.3.1");
  }

  line = "autoflake = 1.3.1";
  dependency = extractDependency(line);
  expect(dependency).toBeDefined();
  if (dependency) {
    expect(dependency.name).toEqual("autoflake");
    expect(dependency.requirements).toEqual("1.3.1");
  }

  line = "autoflake==1.3.1";
  dependency = extractDependency(line);
  expect(dependency).toBeDefined();
  if (dependency) {
    expect(dependency.name).toEqual("autoflake");
    expect(dependency.requirements).toEqual("1.3.1");
  }

  line = 'pre-commit = "^2.2.0"';
  dependency = extractDependency(line);
  expect(dependency).toBeDefined();
  if (dependency) {
    expect(dependency.name).toEqual("pre-commit");
    expect(dependency.requirements).toEqual("2.2.0");
  }

  line = 'uvicorn[standard] = "^2.2.0"';
  dependency = extractDependency(line);
  expect(dependency).toBeDefined();
  if (dependency) {
    expect(dependency.name).toEqual("uvicorn");
    expect(dependency.requirements).toEqual("2.2.0");
  }

  line = 'uvicorn = {extras = ["standard"], version = "^0.13.3"}';
  dependency = extractDependency(line);
  expect(dependency).toBeDefined();
  if (dependency) {
    expect(dependency.name).toEqual("uvicorn");
    expect(dependency.requirements).toEqual("0.13.3");
  }
});
