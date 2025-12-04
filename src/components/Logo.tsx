
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useStoredImage } from '@/components/admin/ImageManager';

type LogoProps = {
  className?: string;
  isUnlinked?: boolean;
};

export function Logo({ className, isUnlinked = false }: LogoProps) {
  const logoUrl = useStoredImage('siteLogo');

  if (!logoUrl) {
    // Render a placeholder to prevent layout shift.
    // This should rarely be seen as the image store is initialized early.
    return <div className={cn("h-[40px] w-[160px] bg-muted rounded-md", className)} />;
  }

  const LogoImage = () => (
      <Image
        src={logoUrl}
        alt="Southland College Logo"
        width={160}
        height={40}
        className={cn("object-contain transition-all duration-300", className?.includes('invert') ? 'filter invert' : '')}
        priority
        key={logoUrl} // Force re-render on URL change
      />
  );

  if (isUnlinked) {
    return (
        <div className={cn("flex items-center", className)}>
            <LogoImage />
        </div>
    );
  }

  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <LogoImage />
    </Link>
  );
}
