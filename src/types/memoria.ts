export type MemoriaEventType = "semana_de_museus" | "primavera_de_museus";
export type MemoriaSectionType = "acervo" | "semana_de_museus" | "primavera_de_museus";

export interface MemoriaEventEdition {
  id: string;
  event_type: MemoriaEventType;
  year: number;
  edition_number?: number | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  external_drive_url?: string | null;
  is_current?: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MemoriaPhoto {
  id: string;
  section_type: MemoriaSectionType;
  edition_id?: string | null;
  storage_path: string;
  caption?: string | null;
  photographer?: string | null;
  reference_code?: string | null;
  is_featured: boolean;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
