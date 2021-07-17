/* eslint-disable jest/no-conditional-expect */
import {
  extractDependency,
  extractQuotedString,
  hasQuotedString,
  isDependency,
} from "../extractDependency";

test("isDependency", () => {
  expect(isDependency("foo==0.9")).toEqual(true);
  expect(isDependency("foo>=0.9")).toEqual(true);
  expect(isDependency('foo = "^0.66.0"')).toEqual(true);
});

test("hasDoubleQuotedString", () => {
  expect(hasQuotedString('"foo"')).toEqual(true);
  expect(hasQuotedString("'foo'")).toEqual(true);
  expect(hasQuotedString("foo")).toEqual(false);
});

test("extractDoubleQuotedString", () => {
  expect(extractQuotedString('"autoflake==1.3.1"')).toEqual("autoflake==1.3.1");
  expect(extractQuotedString("'autoflake==1.3.1'")).toEqual("autoflake==1.3.1");
});

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

  line = '  "autoflake==1.3.1", ';
  dependency = extractDependency(line);
  expect(dependency).toBeDefined();
  if (dependency) {
    expect(dependency.name).toEqual("autoflake");
    expect(dependency.requirements).toEqual("1.3.1");
  }
});
