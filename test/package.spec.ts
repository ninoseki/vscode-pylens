import { getPackage } from "@/package";

test("getPackageInformation", async () => {
  const pkg = await getPackage("urllib3");
  expect(pkg?.info.summary).toBe(
    "HTTP library with thread-safe connection pooling, file post, and more."
  );
});

test("getPackageInformationWithNullExtraProjectUrls", async () => {
  const pkg = await getPackage("v");
  expect(pkg?.info.project_urls).toBeNull();
});

test("getPackageInformationWithoutHomepage", async () => {
  const pkg = await getPackage("django-crispy-forms");
  expect(pkg?.info.home_page).toBe("");
});
