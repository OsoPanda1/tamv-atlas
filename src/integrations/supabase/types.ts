export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_metrics: {
        Row: {
          actual: number
          axis: string
          id: string
          measured_at: string
          objetivo: number
          source: string
        }
        Insert: {
          actual: number
          axis: string
          id?: string
          measured_at?: string
          objetivo: number
          source?: string
        }
        Update: {
          actual?: number
          axis?: string
          id?: string
          measured_at?: string
          objetivo?: number
          source?: string
        }
        Relationships: []
      }
      federations: {
        Row: {
          color_token: string
          conceptual_pct: number
          description: string
          id: string
          level: number
          name: string
          nodes_declared: number
          production_pct: number
          updated_at: string
          wiring_pct: number
        }
        Insert: {
          color_token: string
          conceptual_pct?: number
          description: string
          id: string
          level: number
          name: string
          nodes_declared?: number
          production_pct?: number
          updated_at?: string
          wiring_pct?: number
        }
        Update: {
          color_token?: string
          conceptual_pct?: number
          description?: string
          id?: string
          level?: number
          name?: string
          nodes_declared?: number
          production_pct?: number
          updated_at?: string
          wiring_pct?: number
        }
        Relationships: []
      }
      github_repos: {
        Row: {
          description: string | null
          federation_id: string | null
          forks: number
          full_name: string
          id: string
          language: string | null
          name: string
          open_issues: number
          owner: string
          pushed_at: string | null
          stars: number
          synced_at: string
        }
        Insert: {
          description?: string | null
          federation_id?: string | null
          forks?: number
          full_name: string
          id?: string
          language?: string | null
          name: string
          open_issues?: number
          owner: string
          pushed_at?: string | null
          stars?: number
          synced_at?: string
        }
        Update: {
          description?: string | null
          federation_id?: string | null
          forks?: number
          full_name?: string
          id?: string
          language?: string | null
          name?: string
          open_issues?: number
          owner?: string
          pushed_at?: string | null
          stars?: number
          synced_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_repos_federation_id_fkey"
            columns: ["federation_id"]
            isOneToOne: false
            referencedRelation: "federations"
            referencedColumns: ["id"]
          },
        ]
      }
      identity_profiles: {
        Row: {
          created_at: string
          did: string | null
          display_name: string
          doi_prefix: string | null
          github_handle: string | null
          id: string
          isni: string | null
          jsonld: Json | null
          orcid: string | null
          trust_score: number
          type: string
          updated_at: string
          zenodo_record: string | null
        }
        Insert: {
          created_at?: string
          did?: string | null
          display_name: string
          doi_prefix?: string | null
          github_handle?: string | null
          id?: string
          isni?: string | null
          jsonld?: Json | null
          orcid?: string | null
          trust_score?: number
          type: string
          updated_at?: string
          zenodo_record?: string | null
        }
        Update: {
          created_at?: string
          did?: string | null
          display_name?: string
          doi_prefix?: string | null
          github_handle?: string | null
          id?: string
          isni?: string | null
          jsonld?: Json | null
          orcid?: string | null
          trust_score?: number
          type?: string
          updated_at?: string
          zenodo_record?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          did_tamv: string | null
          display_name: string | null
          id: string
          locale: string
          orcid: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          did_tamv?: string | null
          display_name?: string | null
          id: string
          locale?: string
          orcid?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          did_tamv?: string | null
          display_name?: string | null
          id?: string
          locale?: string
          orcid?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      roadmap_phases: {
        Row: {
          actual: number
          eta: string | null
          fase: string
          id: string
          index_order: number
          milestone: string
          target: number
        }
        Insert: {
          actual?: number
          eta?: string | null
          fase: string
          id?: string
          index_order?: number
          milestone: string
          target?: number
        }
        Update: {
          actual?: number
          eta?: string | null
          fase?: string
          id?: string
          index_order?: number
          milestone?: string
          target?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wiki_articles: {
        Row: {
          access_level: Database["public"]["Enums"]["app_role"]
          content_md: string
          created_at: string
          depth: Database["public"]["Enums"]["article_depth"]
          id: string
          is_critical: boolean
          module_id: string
          read_minutes: number
          search_tsv: unknown
          slug: string
          source_doc: string | null
          status: Database["public"]["Enums"]["article_status"]
          summary: string
          tags: string[]
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["app_role"]
          content_md?: string
          created_at?: string
          depth?: Database["public"]["Enums"]["article_depth"]
          id?: string
          is_critical?: boolean
          module_id: string
          read_minutes?: number
          search_tsv?: unknown
          slug: string
          source_doc?: string | null
          status?: Database["public"]["Enums"]["article_status"]
          summary?: string
          tags?: string[]
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          access_level?: Database["public"]["Enums"]["app_role"]
          content_md?: string
          created_at?: string
          depth?: Database["public"]["Enums"]["article_depth"]
          id?: string
          is_critical?: boolean
          module_id?: string
          read_minutes?: number
          search_tsv?: unknown
          slug?: string
          source_doc?: string | null
          status?: Database["public"]["Enums"]["article_status"]
          summary?: string
          tags?: string[]
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "wiki_articles_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "wiki_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      wiki_modules: {
        Row: {
          created_at: string
          description: string | null
          federation_id: string | null
          id: string
          index_order: number
          level: number
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          federation_id?: string | null
          id: string
          index_order?: number
          level: number
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          federation_id?: string | null
          id?: string
          index_order?: number
          level?: number
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "wiki_modules_federation_id_fkey"
            columns: ["federation_id"]
            isOneToOne: false
            referencedRelation: "federations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_min_role: {
        Args: {
          _min: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "ciudadano"
        | "dev"
        | "empresario"
        | "academia"
        | "gobierno"
        | "admin"
      article_depth:
        | "intro"
        | "tecnico"
        | "constitucional"
        | "filosofico"
        | "juridico"
        | "operativo"
      article_status: "draft" | "review" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "ciudadano",
        "dev",
        "empresario",
        "academia",
        "gobierno",
        "admin",
      ],
      article_depth: [
        "intro",
        "tecnico",
        "constitucional",
        "filosofico",
        "juridico",
        "operativo",
      ],
      article_status: ["draft", "review", "published", "archived"],
    },
  },
} as const
