import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { useArticleDetailBySlug, useSections } from '../domain/article/article.hooks'
import type { Article } from '../domain/article/article.types'

function renderContent(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  )
}

function RelatedCard({ article, onClick }: { article: Article; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group w-full text-left flex gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="w-20 h-16 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {article.title}
        </p>
        <p className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
          <Clock size={10} />
          {article.readTime} min
        </p>
      </div>
    </button>
  )
}

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { article, isLoading, error } = useArticleDetailBySlug(slug ?? null)
  const { allArticles } = useSections()
  const related = allArticles.filter((a) => a.slug !== slug)

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6 max-w-3xl">
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
        <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 w-5/6" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 w-4/6" />
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700" style={{ width: `${98 - i * 3}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> Volver
        </button>
        <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-5 py-4 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      </div>
    )
  }

  if (!article) return null

  const paragraphs = article.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="flex gap-16 items-start">
      {/* Main */}
      <div className="flex-1 min-w-0">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver
        </button>

        {/* Hero image — edge to edge on mobile, contained on desktop */}
        <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8 -mx-4 sm:-mx-8 lg:mx-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight tracking-tight mb-6">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Por <span className="font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">{article.author}</span>
          </p>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <p className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500">
            <Clock size={13} />
            {article.readTime} min de lectura
          </p>
        </div>

        {/* Excerpt */}
        <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-10 border-l-4 border-primary-500 pl-5">
          {article.excerpt}
        </p>

        {/* Body */}
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-base text-gray-700 dark:text-gray-300 leading-[1.9]">
              {renderContent(para)}
            </p>
          ))}
        </div>

        {/* Mobile related */}
        {related.length > 0 && (
          <div className="mt-14 lg:hidden">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              Más noticias
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.slice(0, 4).map((a) => (
                <article
                  key={a.id}
                  onClick={() => navigate(`/article/${a.slug}`)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-bold leading-snug text-gray-900 dark:text-gray-100 line-clamp-2 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    Por {a.author}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      {related.length > 0 && (
        <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0 sticky top-20">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-1 pb-3 border-b border-gray-200 dark:border-gray-700">
            Más noticias
          </h3>
          <div>
            {related.slice(0, 8).map((a) => (
              <RelatedCard
                key={a.id}
                article={a}
                onClick={() => navigate(`/article/${a.slug}`)}
              />
            ))}
          </div>
        </aside>
      )}
    </div>
  )
}
