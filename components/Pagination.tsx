import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

function pageHref(page: number) {
  return `/coins?page=${page}`;
}

export function Pagination({ currentPage, totalPages, hasMorePages }: Pagination) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <nav id="coins-pagination" aria-label="Coins pagination">
      <div className="pagination-content">
        <Link
          href={pageHref(Math.max(1, currentPage - 1))}
          className={cn('pagination-control prev control-button', currentPage <= 1 && 'control-disabled')}
          aria-disabled={currentPage <= 1}
        >
          <ChevronLeft width={20} height={20} />
        </Link>

        <div className="pagination-pages">
          {start > 1 && <span className="ellipsis">...</span>}
          {pages.map((page) => (
            <Link
              key={page}
              href={pageHref(page)}
              className={cn('page-link px-3 py-2', currentPage === page && 'page-link-active')}
            >
              {page}
            </Link>
          ))}
          {end < totalPages && <span className="ellipsis">...</span>}
        </div>

        <Link
          href={pageHref(currentPage + 1)}
          className={cn('pagination-control next control-button', !hasMorePages && 'control-disabled')}
          aria-disabled={!hasMorePages}
        >
          <ChevronRight width={20} height={20} />
        </Link>
      </div>
    </nav>
  );
}
