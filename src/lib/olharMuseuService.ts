import { createClient } from "@supabase/supabase-js";

// Cliente server-side — usa diretamente as env vars (sem cookies)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export interface OlharMuseuPost {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt?: string;
  status: string;
  published_at: string;
  reading_time_minutes: number;
  featured: boolean;
  featured_position?: number;
  museum?: {
    id: string;
    name: string;
    slug: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  featured_image?: {
    id: string;
    path: string;
    bucket: string;
    alt_text?: string;
    public_url: string;
  };
}

const POST_SELECT = `
  id,
  title,
  subtitle,
  slug,
  excerpt,
  status,
  published_at,
  reading_time_minutes,
  featured,
  featured_position,
  museum:museums!posts_museum_id_fkey(id, name, slug),
  category:categories!posts_category_id_fkey(id, name, slug),
  featured_image:media!posts_featured_image_id_fkey(id, path, bucket, alt_text)
`;

function resolveImageUrl(imgRow: any): string {
  if (!imgRow?.path) return "";
  const supabase = getSupabase();
  return (
    supabase.storage
      .from(imgRow.bucket || "olhar-museu")
      .getPublicUrl(imgRow.path).data.publicUrl || ""
  );
}

function mapPost(row: any): OlharMuseuPost {
  const imgRow = row.featured_image as any;
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle || undefined,
    slug: row.slug,
    excerpt: row.excerpt || undefined,
    status: row.status,
    published_at: row.published_at,
    reading_time_minutes: row.reading_time_minutes || 3,
    featured: row.featured || false,
    featured_position: row.featured_position || undefined,
    museum: row.museum
      ? { id: row.museum.id, name: row.museum.name, slug: row.museum.slug }
      : undefined,
    category: row.category
      ? { id: row.category.id, name: row.category.name, slug: row.category.slug }
      : undefined,
    featured_image: imgRow
      ? {
          id: imgRow.id,
          path: imgRow.path,
          bucket: imgRow.bucket || "olhar-museu",
          alt_text: imgRow.alt_text || undefined,
          public_url: resolveImageUrl(imgRow),
        }
      : undefined,
  };
}

export class OlharMuseuService {
  /**
   * Retorna a notícia em destaque (featured = true e menor featured_position)
   */
  static async getFeaturedPost(): Promise<OlharMuseuPost | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("posts")
        .select(POST_SELECT)
        .eq("status", "PUBLISHED")
        .eq("featured", true)
        .order("featured_position", { ascending: true, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar notícia em destaque:", error);
      }

      if (!data) {
        // Fallback: primeira notícia publicada mais recente
        const { data: fallback, error: fallbackErr } = await supabase
          .from("posts")
          .select(POST_SELECT)
          .eq("status", "PUBLISHED")
          .order("published_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (fallbackErr) {
          console.error("Erro ao buscar notícia fallback em destaque:", fallbackErr);
        }

        return fallback ? mapPost(fallback) : null;
      }

      return mapPost(data);
    } catch (err) {
      console.error("Exceção ao buscar notícia em destaque:", err);
      return null;
    }
  }

  /**
   * Retorna as últimas N notícias publicadas, excluindo IDs fornecidos
   */
  static async getLatestPosts(
    limit: number = 3,
    excludeIds: string[] = []
  ): Promise<OlharMuseuPost[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("posts")
        .select(POST_SELECT)
        .eq("status", "PUBLISHED")
        .order("published_at", { ascending: false })
        .limit(limit + excludeIds.length);

      if (error) {
        console.error("Erro ao buscar últimas notícias:", error);
        return [];
      }

      return (data || [])
        .map(mapPost)
        .filter((p) => !excludeIds.includes(p.id))
        .slice(0, limit);
    } catch (err) {
      console.error("Exceção ao buscar últimas notícias:", err);
      return [];
    }
  }
}
