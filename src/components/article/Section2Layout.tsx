import { useNavigate } from 'react-router-dom'
import type { Article } from '../../domain/article/article.types'

interface HorizontalCardProps {
  article: Article
}

function HorizontalCard({ article }: HorizontalCardProps) {
  const navigate = useNavigate()
  return (
    <article
      onClick={() => navigate(`/article/${article.slug}`)}
      className="group cursor-pointer flex gap-4 items-start"
    >
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold leading-snug text-gray-900 dark:text-gray-100 line-clamp-3 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
          Por {article.author}
        </p>
      </div>
    </article>
  )
}

interface Section2LayoutProps {
  articles: Article[]
  name?: string
}

export function Section2Layout({ articles, name }: Section2LayoutProps) {
  return (
    <div className="bg-gray-200 dark:bg-gray-900/60 px-8 py-8">
      {name && (
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
            {name}
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((a) => (
          <HorizontalCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  )
}
