export interface SectionItem {
  id: number
  title: string
  slug: string
  short_description: string
  message: string
}

export interface Section {
  name: string
  items: SectionItem[]
}

export interface SectionsResponse {
  sections: Section[]
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  readTime: number
}
