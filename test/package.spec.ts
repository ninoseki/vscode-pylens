import { getPackage } from "@/package";

test("getPackageInformation", async () => {
  const pkg = await getPackage("urllib3");
  expect(pkg?.info?.summary).toBe(
    "HTTP library with thread-safe connection pooling, file post, and more."
  );
});
