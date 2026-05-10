import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import type { WikiArticle } from "@/hooks/useWikiArticles";

interface ArticleCardProps {
  article: WikiArticle;
  moduleSlug?: string;
}

const accessVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ciudadano: "outline",
  dev: "secondary",
  empresario: "secondary",
  academia: "default",
  gobierno: "default",
  admin: "destructive",
};
const sanitizeIdentityText = (value: string) => value
  .replace(/Pablo\s+Eliseo\s+Becerra\s+Garc[ií]a/gi, "Edwin Oswaldo Castillo Trejo")
  .replace(/biograf[ií]a\s+del\s+ceo/gi, "Biografía de liderazgo TAMV");

export function ArticleCard({ article, moduleSlug }: ArticleCardProps) {
  const href = moduleSlug
    ? `/wiki/${moduleSlug}/${article.slug}`
    : `/wiki/${article.module_id}/${article.slug}`;
  const restricted = article.access_level !== "ciudadano";

  return (
    <Link to={href} className="group">
      <Card className="h-full border-border bg-card hover:border-primary/60 transition-colors">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {sanitizeIdentityText(article.title)}
            </CardTitle>
            {restricted && <Lock className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden />}
          </div>
          <CardDescription className="line-clamp-2 text-muted-foreground">
            {sanitizeIdentityText(article.summary)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-1.5 items-center">
          <Badge variant={accessVariant[article.access_level] ?? "outline"} className="text-[10px]">
            {article.access_level}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            {article.depth}
          </Badge>
          <span className="text-[10px] text-muted-foreground ml-auto">
            {article.read_minutes} min
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
