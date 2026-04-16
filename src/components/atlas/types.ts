export type Role = "ciudadano" | "dev" | "empresario" | "academia" | "gobierno";

export type Depth = "intro" | "tecnico" | "constitucional";

export interface ModuleMeta {
  id: number;
  slug: string;
  title: string;
  level: number;
  icon: string;
  color: string;
  articleCount: number;
}

export interface ArticleSummary {
  id: number;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  moduleId: number;
  moduleSlug: string;
  moduleTitle: string;
  isCritical: boolean;
  readTimeMinutes?: number;
  roleWeight?: Partial<Record<Role, number>>;
  depth: Depth;
}
