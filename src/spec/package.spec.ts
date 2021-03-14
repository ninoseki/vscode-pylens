import { getPackageInformation } from "../package";

test("getPackageInformation", async () => {
  const information = await getPackageInformation("urllib3");
  expect(information?.summary).toBe(
    "HTTP library with thread-safe connection pooling, file post, and more."
  );
});
