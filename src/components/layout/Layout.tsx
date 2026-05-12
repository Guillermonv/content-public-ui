import type { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      <main className="px-4 sm:px-8 lg:px-24 xl:px-36 2xl:px-52 pt-6 pb-10">
        {children}
      </main>
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-800">
        <div className="px-4 sm:px-8 lg:px-24 xl:px-36 2xl:px-52 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500">
          <p>© 2026 Xana. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Términos</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
