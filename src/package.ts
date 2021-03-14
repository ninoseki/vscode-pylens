import { setup } from "axios-cache-adapter";

import { Info, Package } from "./types";

const api = setup({
  baseURL: "https://pypi.org",
});

export async function getPackageInformation(
  name: string
): Promise<Info | undefined> {
  const path = `/pypi/${name}/json`;
  const res = await api.get<Package>(path);
  if (res.status === 200) {
    const package_ = res.data;
    return package_.info;
  }
  return undefined;
}
