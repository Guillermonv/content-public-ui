import { useNavigate } from 'react-router-dom'
import type { Article } from '../../domain/article/article.types'

interface CardProps {
  article: Article
}

function SideCard({ article }: CardProps) {
  const navigate = useNavigate()
  return (
    <article
      onClick={() => navigate(`/article/${article.slug}`)}
      className="group cursor-pointer flex flex-col bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 overflow-hidden"
    >
      <div className="aspect-video w-full flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-between px-4 py-3">
        <div>
          <h3 className="text-sm font-bold leading-snug text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {article.title}
          </h3>
          <div className="h-px w-1/2 bg-gray-400 dark:bg-gray-600 my-2" />
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mt-2">
          Por {article.author}
        </p>
      </div>
    </article>
  )
}

function HeroCard({ article }: CardProps) {
  const navigate = useNavigate()
  return (
    <article
      onClick={() => navigate(`/article/${article.slug}`)}
      className="group cursor-pointer h-full flex flex-col bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 overflow-hidden"
    >
      <div className="flex-1 min-h-0 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex-shrink-0 px-5 py-4">
        <h2 className="text-3xl font-black leading-tight text-gray-900 dark:text-gray-50 line-clamp-3 underline decoration-2 underline-offset-4 decoration-gray-300 dark:decoration-gray-600 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mt-3">
          {article.excerpt}
        </p>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mt-3">
          Por {article.author}
        </p>
      </div>
    </article>
  )
}

interface Section1LayoutProps {
  articles: Article[]
}

export function Section1Layout({ articles }: Section1LayoutProps) {
  const navigate = useNavigate()

  const left = articles.slice(0, 2)
  const hero = articles[2] ?? articles[0]
  const right = articles.slice(3, 5)

  return (
    <>
      {/* Desktop
          Side columns: 18% each → square images scale with viewport
          Center: 1fr → hero fills remaining width
          Grid height: driven by side card content (square image + text × 2)
          Hero: h-full fills whatever the side cards establish
      */}
      <div className="hidden md:grid grid-cols-4">

        <div className="flex flex-col gap-6 pr-3 border-r border-gray-400 dark:border-gray-600">
          {left.map((a) => (
            <SideCard key={a.id} article={a} />
          ))}
        </div>

        <div className="col-span-2 px-3 border-r border-gray-400 dark:border-gray-600">
          {hero && <HeroCard article={hero} />}
        </div>

        <div className="flex flex-col gap-6 pl-3">
          {right.map((a) => (
            <SideCard key={a.id} article={a} />
          ))}
        </div>

      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {hero && (
          <article
            onClick={() => navigate(`/article/${hero.slug}`)}
            className="group cursor-pointer mb-6"
          >
            <div className="-mx-4 sm:-mx-6 aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
              <img
                src={hero.image}
                alt={hero.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {hero.title}
            </h2>
            <div className="h-px w-full bg-gray-400 dark:bg-gray-600 my-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-2">
              {hero.excerpt}
            </p>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
              Por {hero.author}
            </p>
          </article>
        )}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...left, ...right].map((a) => (
            <article
              key={a.id}
              onClick={() => navigate(`/article/${a.slug}`)}
              className="group cursor-pointer py-4 flex gap-4"
            >
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <h3 className="text-sm font-bold leading-snug text-gray-900 dark:text-gray-100 line-clamp-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {a.title}
                </h3>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mt-1">
                  Por {a.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
