import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { ZodError } from "zod";

import { Package, PackageShema } from "@/types";

const api = Axios.create({
  baseURL: "https://pypi.org",
});

setupCache(api);

export async function getPackage(name: string): Promise<Package | undefined> {
  const path = `/pypi/${name}/json`;

  try {
    const res = await api.get<unknown>(path);
    if (res.status === 200) {
      return PackageShema.parse(res.data);
    }
  } catch (e) {
    if (e instanceof ZodError) {
      console.debug("Response from %s is not as expected!", path);
      console.debug("Error:", e);
    }
  }

  return undefined;
}
