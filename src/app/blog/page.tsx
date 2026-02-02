import type { Metadata } from 'next'
import { BlogClient } from 'seobot'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'

export const fetchCache = 'force-no-store'

const ARTICLES_PER_PAGE = 10

export const metadata: Metadata = {
  title: 'Astrology Blog | Orbli',
  description: 'Explore astrology articles, birth chart guides, horoscope insights, and cosmic wisdom. Learn about zodiac signs, planetary transits, and more.',
  alternates: {
    canonical: 'https://www.orbli.app/blog',
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)

  const apiKey = process.env.SEOBOTAI_API_KEY
  if (!apiKey) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Blog</h1>
        <p className="text-indigo-200/50">Blog is being set up. Check back soon.</p>
      </div>
    )
  }

  const client = new BlogClient(apiKey)

  let articles: Awaited<ReturnType<typeof client.getArticles>>['articles'] = []
  let total = 0

  try {
    const result = await client.getArticles(page, ARTICLES_PER_PAGE)
    articles = result.articles
    total = result.total
  } catch {
    // API may be unavailable — show empty state
  }

  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE)

  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Astrology Blog</h1>
        <p className="text-indigo-200/50">No articles yet. Check back soon for astrology insights and guides.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Astrology Blog</h1>
        <p className="text-indigo-200/50">Insights, guides, and cosmic wisdom</p>
      </div>

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

      <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
    </div>
  )
}
