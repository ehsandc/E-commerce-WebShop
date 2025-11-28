import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              {isLast ? (
                <span className="font-medium text-foreground truncate">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground truncate"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
