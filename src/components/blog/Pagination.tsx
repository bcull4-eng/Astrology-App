import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  function pageHref(page: number) {
    if (page === 1) return basePath
    return `${basePath}?page=${page}`
  }

  return (
    <nav className="flex items-center justify-center gap-4 mt-12" aria-label="Pagination">
      {prevPage ? (
        <Link
          href={pageHref(prevPage)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-300 bg-indigo-950/40 border border-indigo-500/20 rounded-lg hover:bg-indigo-950/60 hover:border-indigo-500/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </Link>
      ) : (
        <span className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-500/30 cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
      )}

      <span className="text-sm text-indigo-300/50">
        Page {currentPage} of {totalPages}
      </span>

      {nextPage ? (
        <Link
          href={pageHref(nextPage)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-300 bg-indigo-950/40 border border-indigo-500/20 rounded-lg hover:bg-indigo-950/60 hover:border-indigo-500/30 transition-all"
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-500/30 cursor-not-allowed">
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </nav>
  )
}
