import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { DarkModeToggle } from '../ui/DarkModeToggle'
import { SearchBar } from '../ui/SearchBar'

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Xana inicio">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="6" y="6" width="20" height="20" rx="3" transform="rotate(45 16 16)" fill="#10b981" />
        <rect x="10" y="10" width="12" height="12" rx="2" transform="rotate(45 16 16)" fill="white" fillOpacity="0.35" />
      </svg>
      <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
        Xana
      </span>
    </a>
  )
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 sm:px-8 lg:px-24 xl:px-36 2xl:px-52">
        <div className="flex items-center justify-between h-14 gap-4">
          <Logo />

          {/* Desktop search + dark mode */}
          <div className="hidden md:flex items-center gap-3">
            <SearchBar />
            <DarkModeToggle />
          </div>

          {/* Mobile icons */}
          <div className="flex md:hidden items-center gap-1">
            <DarkModeToggle />
            <button
              aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar'}
              onClick={() => setSearchOpen((o) => !o)}
              className="flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="md:hidden pb-3 border-t border-gray-100 dark:border-gray-800 pt-3">
            <SearchBar placeholder="Buscar artículos..." />
          </div>
        )}
      </div>
    </header>
  )
}
