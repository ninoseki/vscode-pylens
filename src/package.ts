import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

import { Info, Package } from "./types";

const api = Axios.create({
  baseURL: "https://pypi.org",
});
setupCache(api);

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
