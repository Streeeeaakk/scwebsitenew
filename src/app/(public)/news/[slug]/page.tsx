
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getArticle, getNewsArticles } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import type { NewsItem } from '@/lib/schemas';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { NewsCard } from '@/components/NewsCard';

export default function NewsArticlePage() {
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!slug) return;

    const fetchArticleData = async () => {
      setIsLoading(true);
      try {
        const fetchedArticle = await getArticle(slug);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
          document.title = `${fetchedArticle.title} | Southland College`;
          
          const allArticles = await getNewsArticles();
          const related = allArticles
            .filter(a => a.slug !== slug)
            .slice(0, 3);
          setRelatedArticles(related);

        } else {
          setArticle(null);
          document.title = 'Article Not Found | Southland College';
        }
      } catch (error) {
        console.error("Failed to fetch article data:", error);
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Skeleton className="h-9 w-40 mb-12" />
          <div className="mb-8 text-center">
             <Skeleton className="h-6 w-32 mb-4 mx-auto" />
             <Skeleton className="h-10 w-3/4 mx-auto" />
          </div>
           <Skeleton className="relative w-full aspect-video rounded-lg mb-12" />
           <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
           </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  return (
    <div className="bg-background">
        <article>
            <div className="relative border-b bg-secondary overflow-hidden">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 z-0 bg-secondary"
                >
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-background" />
                    <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[200%] aspect-square bg-background rounded-t-full" />
                </div>
                <div className="container relative mx-auto max-w-4xl py-24 text-center z-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 animate-fade-up">Campus News</p>
                    <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground animate-fade-up animation-delay-200">
                    {article.title}
                    </h1>
                    <p className="text-muted-foreground mt-6 flex items-center justify-center gap-2 animate-fade-up animation-delay-400">
                    <CalendarDays className="h-4 w-4"/> 
                    Published on {article.date} by Southland College
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 py-16">
                <div className="mb-12 relative w-full aspect-video rounded-xl overflow-hidden border shadow-lg">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        data-ai-hint={article.hint}
                        priority
                    />
                </div>

                <div className="mb-8">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/news">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to All News
                        </Link></Button>
                </div>

                <div className="prose prose-lg max-w-none mx-auto text-foreground/90 prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-foreground dark:prose-invert">
                    <div dangerouslySetInnerHTML={{ __html: article.fullContent.replace(/\n/g, '<p></p>') }} />
                </div>
            </div>
        </article>

        {relatedArticles.length > 0 && (
            <section className="py-24 border-t bg-secondary">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
                        Related Stories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedArticles.map((item, index) => (
                            <NewsCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        )}
    </div>
  );
}
