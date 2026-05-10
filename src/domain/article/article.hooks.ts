import { useState, useEffect, useMemo } from 'react'
import type { Article, Section } from './article.types'
import { getSections, getArticleBySlug, itemToArticle } from './article.service'

export function useSections() {
  const [sections, setSections] = useState<Section[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    getSections()
      .then((res) => { if (!cancelled) setSections(res.sections) })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Error al cargar') })
      .finally(() => { if (!cancelled) setIsLoading(false) })

    return () => { cancelled = true }
  }, [])

  const allArticles = useMemo<Article[]>(
    () => sections.flatMap((s) => s.items.map(itemToArticle)),
    [sections],
  )

  return { sections, allArticles, isLoading, error }
}

export function useArticleDetailBySlug(slug: string | null) {
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(slug !== null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setIsLoading(true)
    setError(null)
    setArticle(null)

    getArticleBySlug(slug)
      .then((a) => { if (!cancelled) setArticle(a) })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Error') })
      .finally(() => { if (!cancelled) setIsLoading(false) })

    return () => { cancelled = true }
  }, [slug])

  return { article, isLoading, error }
}
