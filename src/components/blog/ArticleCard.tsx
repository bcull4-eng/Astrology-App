import Link from 'next/link'
import Image from 'next/image'

interface ArticleCardProps {
  slug: string
  headline: string
  metaDescription: string
  image: string
  readingTime: number
  createdAt: string
  category: { title: string; slug: string } | null
  tags: { title: string; slug: string }[]
}

export function ArticleCard({
  slug,
  headline,
  metaDescription,
  image,
  readingTime,
  createdAt,
  category,
  tags,
}: ArticleCardProps) {
  const date = new Date(createdAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article className="group bg-indigo-950/30 border border-indigo-500/10 rounded-2xl overflow-hidden hover:bg-indigo-950/50 hover:border-indigo-500/20 transition-all">
      {image && (
        <Link href={`/blog/${slug}`} className="block aspect-[16/9] relative overflow-hidden">
          <Image
            src={image}
            alt={headline}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-indigo-300/50 mb-3">
          <time dateTime={createdAt}>{date}</time>
          <span>&middot;</span>
          <span>{readingTime} min read</span>
          {category && (
            <>
              <span>&middot;</span>
              <Link
                href={`/blog/category/${category.slug}`}
                className="text-indigo-400/70 hover:text-indigo-300 transition-colors"
              >
                {category.title}
              </Link>
            </>
          )}
        </div>

        <Link href={`/blog/${slug}`}>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-200 transition-colors line-clamp-2">
            {headline}
          </h2>
        </Link>

        <p className="text-indigo-200/50 text-sm leading-relaxed mb-4 line-clamp-3">
          {metaDescription}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300/70 hover:bg-indigo-500/20 hover:text-indigo-200 transition-colors"
              >
                {tag.title}
              </Link>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Read more
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
