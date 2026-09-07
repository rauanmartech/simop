import { getSupabase } from "./supabase";
import { MemoriaEventEdition, MemoriaEventType, MemoriaPhoto } from "@/types/memoria";

const BUCKET_NAME = "memoria-e-eventos";

/**
 * Converte um storage_path para a URL pública correspondente no Supabase Storage.
 */
export function getPhotoUrl(storagePath: string): string {
  if (!storagePath) return "";
  if (storagePath.startsWith("http://") || storagePath.startsWith("https://")) {
    return storagePath;
  }

  const supabase = getSupabase();
  if (supabase) {
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
    if (data?.publicUrl) return data.publicUrl;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return storagePath;

  const cleanPath = storagePath.startsWith("/") ? storagePath.slice(1) : storagePath;
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${cleanPath}`;
}

/**
 * Busca as fotos mais recentes do Acervo de Fotos.
 */
export async function getAcervoPhotos(limit: number = 20): Promise<MemoriaPhoto[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("memoria_photos")
    .select("*")
    .eq("section_type", "acervo")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erro ao buscar fotos do acervo:", error);
    return [];
  }

  return data as MemoriaPhoto[];
}

/**
 * Busca todas as edições cadastradas de um evento (Semana ou Primavera),
 * ordenadas por ano decrescente.
 */
export async function getEventEditions(
  eventType: MemoriaEventType,
  onlyPublished: boolean = true
): Promise<MemoriaEventEdition[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  let query = supabase
    .from("memoria_event_editions")
    .select("*")
    .eq("event_type", eventType)
    .order("year", { ascending: false });

  if (onlyPublished) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Erro ao buscar edições de ${eventType}:`, error);
    return [];
  }

  return data as MemoriaEventEdition[];
}

/**
 * Busca a edição atual/principal de um evento (se marcada com is_current, ou a de maior ano).
 */
export async function getLatestEventEdition(
  eventType: MemoriaEventType
): Promise<MemoriaEventEdition | null> {
  const editions = await getEventEditions(eventType, true);
  if (editions.length === 0) return null;

  const current = editions.find((e) => e.is_current);
  return current || editions[0];
}

/**
 * Busca uma edição específica de um evento pelo ano.
 */
export async function getEventEditionByYear(
  eventType: MemoriaEventType,
  year: number,
  onlyPublished: boolean = true
): Promise<MemoriaEventEdition | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  let query = supabase
    .from("memoria_event_editions")
    .select("*")
    .eq("event_type", eventType)
    .eq("year", year);

  if (onlyPublished) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query.single();

  if (error) {
    if (error.code !== "PGRST116") {
      console.error(`Erro ao buscar edição ${year} de ${eventType}:`, error);
    }
    return null;
  }

  return data as MemoriaEventEdition;
}

/**
 * Busca as fotografias de uma edição específica.
 */
export async function getEventPhotos(
  editionId: string,
  limit?: number,
  onlyPublished: boolean = true
): Promise<MemoriaPhoto[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  let query = supabase
    .from("memoria_photos")
    .select("*")
    .eq("edition_id", editionId)
    .order("is_featured", { ascending: false })
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (onlyPublished) {
    query = query.eq("is_published", true);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Erro ao buscar fotos da edição ${editionId}:`, error);
    return [];
  }

  return data as MemoriaPhoto[];
}
