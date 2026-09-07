import { museums } from "@/data/museums";
import { Museum, MuseumCategory } from "@/types/museum";

export function getAllMuseums(): Museum[] {
  return museums;
}

export function getMuseumBySlug(slug: string): Museum | undefined {
  return museums.find((m) => m.slug === slug);
}

export function getMuseumById(id: string): Museum | undefined {
  return museums.find((m) => m.id === id);
}

export function getFeaturedMuseums(): Museum[] {
  return museums.slice(0, 6);
}

export function filterMuseums(
  query?: string,
  category?: MuseumCategory,
  sortBy: "relevance" | "alphabetical" = "relevance"
): Museum[] {
  let result = [...museums];

  if (category && category !== "Todos") {
    result = result.filter((m) => {
      if (category === "História") return m.categoria === "História";
      if (category === "Arte") return m.categoria === "Arte";
      if (category === "Arte Sacra") return m.categoria === "Arte Sacra";
      if (category === "Patrimônio") return m.tags.includes("Patrimônio");
      if (category === "Cultura") return m.categoria === "Cultura" || m.tags.includes("Cultura");
      return m.categoria === category;
    });
  }

  if (query && query.trim() !== "") {
    const q = query.toLowerCase().trim();
    result = result.filter(
      (m) =>
        m.nome.toLowerCase().includes(q) ||
        m.nome_curto.toLowerCase().includes(q) ||
        m.categoria.toLowerCase().includes(q) ||
        m.descricao_curta.toLowerCase().includes(q) ||
        m.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (sortBy === "alphabetical") {
    result.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  return result;
}

export function getRelatedMuseums(currentSlug: string, count: number = 3): Museum[] {
  const current = getMuseumBySlug(currentSlug);
  if (!current) return museums.slice(0, count);

  // First try explicitly configured related ids
  const explicitRelated = current.museus_relacionados
    .map((id) => getMuseumById(id))
    .filter((m): m is Museum => m !== undefined && m.slug !== currentSlug);

  if (explicitRelated.length >= count) {
    return explicitRelated.slice(0, count);
  }

  // Fallback to same category or tags
  const fallback = museums.filter(
    (m) =>
      m.slug !== currentSlug &&
      !explicitRelated.some((er) => er.id === m.id) &&
      (m.categoria === current.categoria || m.tags.some((t) => current.tags.includes(t)))
  );

  const combined = [...explicitRelated, ...fallback];
  return combined.slice(0, count);
}
