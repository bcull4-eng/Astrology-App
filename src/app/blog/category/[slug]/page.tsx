import type { Metadata } from 'next'
import { BlogClient } from 'seobot'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'
import Link from 'next/link'

export const fetchCache = 'force-no-store'

const ARTICLES_PER_PAGE = 10

function getClient() {
  const apiKey = process.env.SEOBOTAI_API_KEY
  if (!apiKey) return null
  return new BlogClient(apiKey)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return {
    title: `${title} Articles | Orbli Blog`,
    description: `Browse astrology articles about ${title.toLowerCase()}. Guides, insights, and cosmic wisdom from Orbli.`,
    alternates: {
      canonical: `https://www.orbli.app/blog/category/${slug}`,
    },
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1)
  const categoryTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  const client = getClient()
  if (!client) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">{categoryTitle}</h1>
        <p className="text-indigo-200/50">Blog is being set up. Check back soon.</p>
      </div>
    )
  }

  let articles: Awaited<ReturnType<typeof client.getCategoryArticles>>['articles'] = []
  let total = 0

  try {
    const result = await client.getCategoryArticles(slug, page - 1, ARTICLES_PER_PAGE)
    articles = result.articles
    total = result.total
  } catch {
    // API may be unavailable
  }

  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-sm text-indigo-300/50 mb-8">
        <Link href="/blog" className="hover:text-indigo-300 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-indigo-300/70">{categoryTitle}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">{categoryTitle}</h1>
        <p className="text-indigo-200/50">
          {total} {total === 1 ? 'article' : 'articles'} in this category
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-indigo-200/50 text-center py-12">No articles found in this category.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              slug={article.slug}
              headline={article.headline}
              metaDescription={article.metaDescription}
              image={article.image}
              readingTime={article.readingTime}
              createdAt={article.createdAt}
              category={article.category}
              tags={article.tags}
            />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/blog/category/${slug}`} />
    </div>
  )
}
