import { useSections } from '../domain/article/article.hooks'
import { itemToArticle } from '../domain/article/article.service'
import { Section1Layout } from '../components/article/Section1Layout'
import { Section2Layout } from '../components/article/Section2Layout'
import { Section3Layout } from '../components/article/Section3Layout'

function LoadingSkeleton() {
  return (
    <div className="space-y-16 animate-pulse">
      {/* Section 1 skeleton */}
      <div className="hidden md:grid grid-cols-4 gap-x-2 border border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-700">
        <div className="flex flex-col gap-y-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col bg-white dark:bg-gray-900">
              <div className="aspect-square w-full bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 w-4/5" />
                <div className="h-2 bg-gray-200 dark:bg-gray-700 w-1/3 mt-3" />
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 bg-white dark:bg-gray-900 flex flex-col">
          <div className="aspect-square w-full bg-gray-200 dark:bg-gray-700" />
          <div className="px-6 py-5 space-y-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 w-full" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 w-5/6" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 w-full mt-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 w-4/5" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col bg-white dark:bg-gray-900">
              <div className="aspect-square w-full bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 w-4/5" />
                <div className="h-2 bg-gray-200 dark:bg-gray-700 w-1/3 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Section 1 skeleton */}
      <div className="md:hidden space-y-4">
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 -mx-4" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 w-4/5" />
      </div>
      {/* Section 2 skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-5/6" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  const { sections, isLoading, error } = useSections()

  if (isLoading) return <LoadingSkeleton />

  if (error) {
    return (
      <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-5 py-4 text-sm text-red-700 dark:text-red-300">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        const articles = section.items.map(itemToArticle)
        if (index === 0) {
          return (
            <section key={section.name}>
              <Section1Layout articles={articles} />
            </section>
          )
        }
        if (index === 1) {
          return (
            <section key={section.name}>
              <Section2Layout articles={articles} name={section.name} />
            </section>
          )
        }
        return (
          <section key={section.name}>
            <Section3Layout articles={articles} name={section.name} />
          </section>
        )
      })}
    </div>
  )
}
