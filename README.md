# Xana —

<img width="1088" height="944" alt="Screenshot 2026-04-18 at 14 27 28" src="https://github.com/user-attachments/assets/137a486e-cffd-4897-adf9-3179f1f69edb" />



## Stack

- **React 18** + **TypeScript**
- **Vite** — bundler y dev server
- **Tailwind CSS** — estilos utilitarios
- **Lucide React** — iconografía

## Estructura del proyecto

```
src/
├── components/
│   ├── article/
│   │   ├── HeroSection.tsx      # Sección destacados (4 artículos, grid 4 columnas)
│   │   ├── ArticleHeroCard.tsx  # Tarjeta de artículo destacado
│   │   ├── ArticleGrid.tsx      # Grid de artículos (4 columnas)
│   │   └── ArticleCard.tsx      # Tarjeta de artículo estándar
│   ├── layout/
│   │   ├── Layout.tsx           # Layout principal (header + main + footer)
│   │   └── Header.tsx           # Cabecera con nav, búsqueda y dark mode
│   └── ui/
│       ├── DarkModeToggle.tsx
│       └── SearchBar.tsx
├── domain/
│   └── article/
│       └── article.types.ts     # Tipos del dominio Article
└── main.tsx
```

## Grids de contenido

Ambas secciones usan el mismo patrón de columnas responsive:

| Breakpoint | Columnas |
|------------|----------|
| mobile     | 2        |
| md (768px) | 3        |
| lg (1024px)| 4        |

- **HeroSection** — muestra los 4 primeros artículos destacados
- **ArticleGrid** — muestra el resto del catálogo con carga progresiva

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
