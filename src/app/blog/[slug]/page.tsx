import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BlogClient } from 'seobot'
import '../blog.css'

export const fetchCache = 'force-no-store'

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
  const client = getClient()
  if (!client) return { title: 'Blog | Orbli' }

  const article = await client.getArticle(slug)
  if (!article) return { title: 'Article Not Found | Orbli' }

  return {
    title: article.headline,
    description: article.metaDescription,
    keywords: article.metaKeywords,
    alternates: {
      canonical: `https://www.orbli.app/blog/${slug}`,
    },
    openGraph: {
      title: article.headline,
      description: article.metaDescription,
      type: 'article',
      url: `https://www.orbli.app/blog/${slug}`,
      images: article.image ? [{ url: article.image }] : undefined,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.headline,
      description: article.metaDescription,
      images: article.image ? [article.image] : undefined,
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const client = getClient()
  if (!client) notFound()

  const article = await client.getArticle(slug)
  if (!article) notFound()

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.metaDescription,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    url: `https://www.orbli.app/blog/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Orbli',
      url: 'https://www.orbli.app',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-indigo-300/50 mb-8">
          <Link href="/blog" className="hover:text-indigo-300 transition-colors">
            Blog
          </Link>
          {article.category && (
            <>
              <span>/</span>
              <Link
                href={`/blog/category/${article.category.slug}`}
                className="hover:text-indigo-300 transition-colors"
              >
                {article.category.title}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-indigo-300/70 truncate">{article.headline}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {article.headline}
          </h1>
          <div className="flex items-center gap-4 text-sm text-indigo-300/50">
            <time dateTime={article.publishedAt}>{publishedDate}</time>
            <span>&middot;</span>
            <span>{article.readingTime} min read</span>
          </div>
        </header>

        {/* Featured image */}
        {article.image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
            <Image
              src={article.image}
              alt={article.headline}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Article content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-indigo-500/10">
            <h3 className="text-sm font-medium text-indigo-300/50 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/tag/${tag.slug}`}
                  className="text-sm px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300/70 hover:bg-indigo-500/20 hover:text-indigo-200 transition-colors"
                >
                  {tag.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related posts */}
        {article.relatedPosts.length > 0 && (
          <div className="mt-10 pt-8 border-t border-indigo-500/10">
            <h3 className="text-lg font-semibold text-white mb-4">Related Articles</h3>
            <div className="grid gap-3">
              {article.relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block p-4 bg-indigo-950/30 border border-indigo-500/10 rounded-xl hover:bg-indigo-950/50 hover:border-indigo-500/20 transition-all"
                >
                  <span className="text-white hover:text-indigo-200 transition-colors">
                    {post.headline}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-indigo-500/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </>
  )
}
