import { useNavigate } from 'react-router-dom'
import type { Article } from '../../domain/article/article.types'

interface GridCardProps {
  article: Article
}

function GridCard({ article }: GridCardProps) {
  const navigate = useNavigate()
  return (
    <article
      onClick={() => navigate(`/article/${article.slug}`)}
      className="group cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-sm font-bold leading-snug text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {article.title}
      </h3>
      <div className="h-px w-1/2 bg-gray-400 dark:bg-gray-600 mb-2" />
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-2">
        {article.excerpt}
      </p>
      <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
        Por {article.author}
      </p>
    </article>
  )
}

interface Section4LayoutProps {
  articles: Article[]
  name?: string
}

export function Section4Layout({ articles, name }: Section4LayoutProps) {
  return (
    <div>
      {name && (
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-400 dark:bg-gray-600" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
            {name}
          </span>
          <div className="flex-1 h-px bg-gray-400 dark:bg-gray-600" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, 4).map((a) => (
          <GridCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  )
}
