import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PaginationBarProps {
  pageNumber: number;
  pageCount: number;
  href: string;
}

export default function PaginationBar({
  pageNumber,
  pageCount,
  href
}: PaginationBarProps) {
  return (
    <div className="flex gap-3 items-center">
      <PaginationLink
        href={`${href}?page=${pageNumber - 1}`}
        enabled={pageNumber > 1}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Previous Page</span>
      </PaginationLink>
      <span>
        Page {pageNumber} of {pageCount}
      </span>
      <PaginationLink
        href={`${href}?page=${pageNumber + 1}`}
        enabled={pageNumber < pageCount}
      >
        <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Next Page</span>
      </PaginationLink>
    </div>
  );
}

interface PaginationLinkProps {
  children: ReactNode;
  enabled: boolean;
  href: string;
}

function PaginationLink({ children, enabled, href }: PaginationLinkProps) {
  if (!enabled) {
    return (
      <span className="border cursor-not-allowed rounded text-slate-300 text-sm">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="border border-purple-300 rounded bg-purple-100 text-slate-700 text-sm
                   hover:bg-purple-200 hover:text-slate-900"
    >
      {children}
    </Link>
  );
}
