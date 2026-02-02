import { BlogClient } from 'seobot'

export const dynamic = 'force-dynamic'

export async function GET() {
  const apiKey = process.env.SEOBOTAI_API_KEY
  if (!apiKey) {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { headers: { 'Content-Type': 'application/xml' } },
    )
  }

  const client = new BlogClient(apiKey)
  const baseUrl = 'https://www.orbli.app'

  const allArticles: { slug: string; updatedAt: string }[] = []
  let page = 1
  const limit = 100

  try {
    // Fetch all articles page by page
    while (true) {
      const result = await client.getArticles(page, limit)
      for (const article of result.articles) {
        allArticles.push({ slug: article.slug, updatedAt: article.updatedAt })
      }
      if (allArticles.length >= result.total) break
      page++
    }
  } catch {
    // If API fails, return empty sitemap
  }

  const urls = allArticles
    .map(
      (article) => `  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
