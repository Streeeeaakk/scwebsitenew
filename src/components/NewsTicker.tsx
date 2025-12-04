
'use client';

import { useState, useEffect } from 'react';
import { getNewsArticles } from '@/app/actions';
import type { NewsItem } from '@/lib/schemas';
import Link from 'next/link';

export const NewsTicker = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const articles = await getNewsArticles();
        setNewsItems(articles);
      } catch (error) {
        console.error("Failed to fetch news articles for ticker:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (isLoading || newsItems.length === 0) {
    return null; // Don't render anything if loading or no news
  }

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto">
        <div className="relative bg-card/80 backdrop-blur-sm border rounded-lg p-3 sm:p-4 overflow-hidden shadow-lg">
            <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute h-5 w-5 bg-red-500 rounded-full animate-ping"></div>
                            <div className="relative h-3 w-3 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="font-bold text-red-600 uppercase text-xs sm:text-sm tracking-wider hidden sm:block">Live</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base hidden md:block">Southland College News Center</h3>
                </div>
                <div className="flex-grow relative overflow-hidden mx-4">
                    <div className="animate-marquee-slow whitespace-nowrap">
                        {newsItems.concat(newsItems).map((item, index) => (
                            <Link key={`${item.slug}-${index}`} href={`/news/${item.slug}`} className="inline-block mx-6 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                                <span className="text-primary font-bold">|</span> {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
