import { z } from "zod";

export const ProjectExtraUrlsSchema = z.object({
  Homepage: z.optional(z.string()),
});

export const InfoSchema = z.object({
  name: z.string(),
  summary: z.string(),
  home_page: z.string(),
  project_url: z.string(),
  version: z.string(),
  project_urls: z.nullable(ProjectExtraUrlsSchema),
});

export const PackageShema = z.object({
  info: InfoSchema,
});

export type Info = z.infer<typeof InfoSchema>;
export type Package = z.infer<typeof PackageShema>;

export interface Dependency {
  name: string;
  requirements: string;
}

export interface DependencyMap {
  [key: string]: string;
}

export interface Poetry {
  dependencies: DependencyMap;
  devDependencies: DependencyMap;
}

export interface Tool {
  poetry: Poetry;
}

export interface Project {
  tool: Tool;
}
