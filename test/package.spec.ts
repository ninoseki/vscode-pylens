import { buildHoverMessage, getPackage } from "@/package";
import { Package } from "@/types";

test("getPackage", async () => {
  const pkg = await getPackage("urllib3");
  expect(pkg).not.toBeNull();
  expect(pkg?.info?.summary).toBe(
    "HTTP library with thread-safe connection pooling, file post, and more."
  );
});

test("buildHoverMessage", () => {
  const pkg: Package = {
    info: {
      home_page: "",
      name: "django-crispy-forms",
      package_url: "",
      project_url: "https://pypi.org/project/django-crispy-forms/",
      summary: "Best way to have Django DRY forms",
      version: "2.0",
    },
  };
  const hoverMessage = buildHoverMessage(pkg);
  expect(hoverMessage).toContain(pkg.info.project_url);
});
