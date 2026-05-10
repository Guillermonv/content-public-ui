import type { Article, SectionItem, SectionsResponse } from './article.types'
import { MOCK_SECTIONS } from './article.mock'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8081/api/v1'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

function estimateReadTime(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))
}

export function itemToArticle(item: SectionItem): Article {
  return {
    id: String(item.id),
    title: item.title,
    slug: item.slug,
    excerpt: item.short_description,
    content: item.message,
    image: `https://picsum.photos/seed/article-${item.id}/800/450`,
    author: 'Redacción Xana',
    readTime: estimateReadTime(item.message),
  }
}

export async function getSections(): Promise<SectionsResponse> {
  if (USE_MOCK) return MOCK_SECTIONS

  const res = await fetch(`${API_BASE}/content`)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  const raw = await res.json()
  if (Array.isArray(raw?.sections)) return { sections: raw.sections }

  throw new Error('Formato de respuesta inesperado de la API')
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  if (USE_MOCK) {
    for (const section of MOCK_SECTIONS.sections) {
      const item = section.items.find((i) => i.slug === slug)
      if (item) return itemToArticle(item)
    }
    throw new Error(`Artículo no encontrado: ${slug}`)
  }

  const res = await fetch(`${API_BASE}/content/slug/${encodeURIComponent(slug)}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  const raw = await res.json()
  const item: SectionItem = {
    id: raw.id,
    title: raw.title,
    slug: raw.slug ?? slug,
    short_description: raw.short_description,
    message: raw.message,
  }
  return itemToArticle(item)
}
