export type MuseumCategory =
  | "Todos"
  | "História"
  | "Arte"
  | "Arte Sacra"
  | "Patrimônio"
  | "Cultura"
  | "Ciência";

export interface GalleryItem {
  id: string | number;
  imagem: string;
  legenda: string;
}

export interface VisitingInfo {
  horario: string;
  entrada: string;
  duracao_visita: string;
  ultimo_acesso?: string;
}

export interface LocationInfo {
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep?: string;
  latitude?: number;
  longitude?: number;
}

export interface ContactInfo {
  telefone: string;
  email: string;
  website: string;
  instagram: string;
}

export interface Museum {
  id: string;
  slug: string;
  nome: string;
  nome_curto: string;
  categoria: MuseumCategory;
  subcategoria: string;
  tags: string[];
  hero_texto?: string;
  hero_texto_auxiliar?: string;
  resumo: string;
  descricao_curta: string;
  sobre: string;
  historia: string;
  acervo: string;
  destaques: string[];
  visitacao: VisitingInfo;
  localizacao: LocationInfo;
  acessibilidade: string;
  contato: ContactInfo;
  imagem_capa: string;
  galeria: GalleryItem[];
  museus_relacionados: string[];
}
