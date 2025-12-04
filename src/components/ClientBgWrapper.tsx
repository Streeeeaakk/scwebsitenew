
'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useStoredImage } from '@/components/admin/ImageManager';

const ClientBgWrapper = React.forwardRef<
  HTMLElement,
  {
    storageKey: string;
    defaultImage: string;
    className: string;
    imageHint: string;
    isParallax?: boolean;
    withOverlay?: boolean;
    children: React.ReactNode;
  }
>(({
  storageKey,
  defaultImage,
  className,
  imageHint,
  isParallax = false,
  withOverlay = true,
  children
}, ref) => {
  const storedImageUrl = useStoredImage(storageKey, defaultImage);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showImage = isClient && !!storedImageUrl;

  return (
    <section
      ref={ref}
      className={cn("relative bg-cover bg-center bg-no-repeat bg-secondary transition-all duration-500", className, { 'bg-fixed': isParallax && showImage })}
      style={{ backgroundImage: showImage ? `url('${storedImageUrl}')` : 'none' }}
      data-ai-hint={imageHint}
      key={storedImageUrl} // Force re-render on URL change
    >
      {showImage && withOverlay && <div className="absolute inset-0 bg-black/60" />}
      {children}
    </section>
  );
});

ClientBgWrapper.displayName = 'ClientBgWrapper';

export { ClientBgWrapper };

    