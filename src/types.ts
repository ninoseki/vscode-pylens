export interface Info {
  name: string;
  summary: string;
  home_page: string;
  package_url: string;
  project_url: string;
  version: string;
}

export interface Package {
  info: Info;
}

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
