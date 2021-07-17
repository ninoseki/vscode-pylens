export const dependencyRegexp =
  /^([a-zA-z0-9-_]+)\s*=+\s*.+["|']?\^*([0-9.]+)["|']?.+/;
export const packageNameRegexp = /^([a-zA-z0-9-_]+)\s*=+\s*/;
export const packageRequirementsRegexp = /["|']?\^*([0-9.]+)["|']?/;
export const bracketsRegexp = /\[[a-zA-z0-9-_]+\]/;
