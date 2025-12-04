
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState, useEffect } from 'react';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or nothing on the server to prevent mismatch
    return (
        <div className="bg-secondary border-b">
            <div className="container mx-auto px-4">
                <div className="h-[43px]"></div>
            </div>
        </div>
    );
  }

  const segments = pathname.split('/').filter(Boolean);

  const formatSegment = (segment: string) => {
    // Handle UUIDs or long numeric slugs in news and academics
    if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i) || segment.length > 20) {
      return 'Article'; // Generic name for long slugs
    }
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="bg-secondary border-b">
      <div className="container mx-auto px-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 py-3 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            {segments.map((segment, index) => {
              const href = `/${segments.slice(0, index + 1).join('/')}`;
              const isLast = index === segments.length - 1;
              const formattedSegment = formatSegment(segment);
              
              if(segment === 'admin' || segment === 'alumni' && (segments[index+1] === 'feed' || segments[index+1] === 'portal')) return null;

              return (
                <Fragment key={href}>
                  <li className="text-muted-foreground">•</li>
                  <li>
                    {isLast ? (
                      <span className="font-semibold text-foreground">{formattedSegment}</span>
                    ) : (
                      <Link href={href} className="text-muted-foreground hover:text-primary transition-colors">
                        {formattedSegment}
                      </Link>
                    )}
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
