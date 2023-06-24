import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

import { Package } from "@/types";

const api = Axios.create({
  baseURL: "https://pypi.org",
});

setupCache(api);

export async function getPackage(name: string): Promise<Package | undefined> {
  const path = `/pypi/${name}/json`;

  try {
    const res = await api.get<Package>(path);
    if (res.status === 200) {
      return res.data;
    }
  } catch (_) {
    return undefined;
  }

  return undefined;
}

export function buildHoverMessage(pkg: Package): string {
  const url = (() => {
    // Select URL to display by following the order
    // - home_page
    // - project_url
    // - package_url
    if (pkg.info.home_page !== "") {
      return pkg.info.home_page;
    }
    if (pkg.info.project_url !== "") {
      return pkg.info.project_url;
    }
    return pkg.info.package_url;
  })();

  return `${pkg.info.summary}\n\nLatest version: ${pkg.info.version}\n\n${url}`;
}
