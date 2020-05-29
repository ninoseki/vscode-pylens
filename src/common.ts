import { Cache, Info } from "./types";

export const cache: Cache = new Map<string, Info>();
export const dependencyRegexp = /^([a-zA-z0-9-_]+)\s*=+\s*["|']?\^*([0-9.]+)["|']?/;
