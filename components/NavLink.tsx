'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
  children: ReactNode;
  href: string;
  prefetch?: boolean;
}

export default function NavLink({
  href,
  children,
  prefetch = false
}: NavLinkProps) {
  const pathname = usePathname();
  /* using Link uses client side navigation, no longer fetches new html from server after first load. acts more like a SPA. **in prod, Next prefetches all Links by default (fetches data, not html)
   */

  if (pathname === href) {
    return (
      <span className="px-1 py-2 text-orange-800 select-none  border-b-2 border-b-orange-800">
        {children}
      </span>
    );
  }
  return (
    <Link
      className="px-1 py-1 text-orange-800 hover:bg-orange-300"
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
