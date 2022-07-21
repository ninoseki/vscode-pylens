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

  expect(isDependency("foo~=0.961")).toEqual(true);
  expect(isDependency("foo!=0.961")).toEqual(true);
  expect(isDependency("foo<=0.961")).toEqual(true);
  expect(isDependency("foo<0.961")).toEqual(true);

  expect(isDependency("foo ~= 0.961")).toEqual(true);
  expect(isDependency("foo != 0.961")).toEqual(true);
  expect(isDependency("foo <= 0.961")).toEqual(true);
  expect(isDependency("foo < 0.961 ")).toEqual(true);
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

test.each([
  ['foo = "^1.0.0"', "foo", "1.0.0"],
  ["foo = 1.0.0", "foo", "1.0.0"],
  ["foo == 1.0.0", "foo", "1.0.0"],
  ["foo ~= 1.0.0", "foo", "1.0.0"],
  ["foo != 1.0.0", "foo", "1.0.0"],
  ["foo <= 1.0.0", "foo", "1.0.0"],
  ["foo < 1.0.0", "foo", "1.0.0"],
  ["foo[extra] == 1.0.0", "foo", "1.0.0"],
  ['foo = {extras = ["extra"], version = "^1.0.0"}', "foo", "1.0.0"],
  ['  "foo==1.0.0", ', "foo", "1.0.0"],
])("extractDependency", (line, name, requirements) => {
  const dependency = extractDependency(line);
  expect(dependency).toBeDefined();
  if (dependency) {
    expect(dependency.name).toEqual(name);
    expect(dependency.requirements).toEqual(requirements);
  }
});
