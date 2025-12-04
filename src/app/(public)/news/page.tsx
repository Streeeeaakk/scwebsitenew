

'use client';

import { useState, useEffect } from 'react';
import { getNewsArticles } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import type { NewsItem } from '@/lib/schemas';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleCard } from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { EventCard } from '@/components/EventCard';
import { ClientBgWrapper } from '@/components/ClientBgWrapper';

const upcomingEvents = [
    {
      month: 'Oct',
      day: '16',
      image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=2080&auto=format&fit=crop',
      title: '2nd AI Conference highlights national impact, industry applications',
      description: 'AI Horizons PH 2025, the country\'s premier conference on AI-powered innovation, is...',
      href: '#',
    },
    {
      month: 'Nov',
      day: '5',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
      title: 'Global Leadership Summit for Students',
      description: 'Join young leaders from around the world to discuss pressing global issues and develop your leadership skills.',
      href: '#',
    },
];

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'News & Updates | Southland College';
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const articles = await getNewsArticles();
        setNewsItems(articles);
      } catch (error) {
        console.error("Failed to fetch news articles:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const mainStory = newsItems.find(item => item.isFeatured) || newsItems[0];
  const otherStories = newsItems.filter(item => item.id !== mainStory?.id);

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold text-foreground">No News Found</h2>
          <p className="mt-2 text-muted-foreground">There are no news articles to display at the moment. Please check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">

        {mainStory && (
          <section className="pb-12">
             <div className="mb-4">
                 <Link href="/news" className="font-semibold text-sm uppercase tracking-wider text-primary hover:underline">
                  Latest News <span className="font-sans">&gt;</span>
                </Link>
             </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <Link href={`/news/${mainStory.slug}`} className="block group">
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                        src={mainStory.image}
                        alt={mainStory.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={mainStory.hint}
                    />
                  </div>
              </Link>
              <div className="flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4 leading-tight">
                    <Link href={`/news/${mainStory.slug}`} className="hover:underline">{mainStory.title}</Link>
                  </h2>
                  <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                    {mainStory.description}
                  </p>
                  <div className="flex">
                    <Button asChild variant="outline" className="font-semibold">
                      <Link href={`/news/${mainStory.slug}`}>See more</Link>
                    </Button>
                  </div>
              </div>
            </div>
          </section>
        )}
        
        {otherStories.length > 0 && (
          <section className="py-12 border-t">
            <div className="mb-6">
               <h2 className="font-semibold text-sm uppercase tracking-wider text-foreground">
                  More From Southland
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherStories.map((item) => (
                <ArticleCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
