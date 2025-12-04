
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useStoredImage } from './admin/ImageManager';

interface PageHeaderProps {
  title: string;
  description: string;
  storageKey: string;
  defaultImage: string;
  imageHint: string;
}

export function PageHeader({ title, description, storageKey, defaultImage, imageHint }: PageHeaderProps) {
    const storedImageUrl = useStoredImage(storageKey, defaultImage);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Only set showImage to true if we are on the client AND the URL is not empty.
    const showImage = isClient && !!storedImageUrl;

  return (
      <section className="relative w-full h-[400px] bg-secondary">
          {showImage && (
            <div className="absolute inset-0 transition-opacity duration-500 opacity-100" data-ready={showImage}>
              <Image
                  src={storedImageUrl}
                  alt={imageHint}
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint={imageHint}
                  key={storedImageUrl}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30" />
          <div 
              className="absolute inset-0"
              style={{
                  clipPath: 'polygon(0 0, 45% 0, 65% 100%, 0 100%)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
              }}
          >
               <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
          </div>

           <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="max-w-xl">
                  <h1 className="text-5xl font-bold text-white text-shadow-lg shadow-black/50 animate-fade-up">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-lg text-white/90 animate-fade-up animation-delay-200 text-shadow-md shadow-black/50">
                    {description}
                  </p>
              </div>
          </div>
      </section>
  );
}
