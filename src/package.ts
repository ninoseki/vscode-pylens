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
