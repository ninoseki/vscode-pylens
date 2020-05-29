import axios from "axios";

import { Info, Package } from "./types";

export async function getPackageInfomation(
  name: string
): Promise<Info | undefined> {
  const url = `https://pypi.org/pypi/${name}/json`;
  const res = await axios.get<Package>(url);
  if (res.status === 200) {
    const package_ = res.data;
    return package_.info;
  }
  return undefined;
}
