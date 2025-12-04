'use client';

import { useState, useEffect } from 'react';
import { getArticle, getNewsArticles } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import type { NewsItem } from '@/lib/schemas';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ArticlePreview = ({ slug }: { slug: string }) => {
    const [article, setArticle] = useState<NewsItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const fetchArticle = async () => {
            setIsLoading(true);
            const fetchedArticle = await getArticle(slug);
            setArticle(fetchedArticle);
            setIsLoading(false);
        };
        fetchArticle();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="p-4 md:p-6">
                <Skeleton className="h-9 w-40 mb-12" />
                <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
                <Skeleton className="relative w-full aspect-video rounded-lg mb-8" />
                <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                </div>
            </div>
        );
    }
    
    if (!article) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h2 className="text-xl font-semibold text-muted-foreground">Article Not Found</h2>
                <p className="text-muted-foreground">The article you are looking for could not be found or is no longer available.</p>
                <Button asChild variant="outline" className="mt-4">
                    <Link href="/admin/settings/news">Back to News Management</Link>
                </Button>
            </div>
        )
    }

    return (
        <article className="bg-background rounded-lg border shadow-sm max-w-4xl mx-auto">
             <div className="p-4 border-b">
                 <Button asChild variant="outline" size="sm">
                    <Link href="/admin/settings/news">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to News Management
                    </Link>
                </Button>
             </div>
             <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    data-ai-hint={article.hint}
                    priority
                />
            </div>
            <div className="p-6 md:p-8">
                <header className="mb-6">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{article.title}</h1>
                    <p className="text-muted-foreground">Published on {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </header>
                <div 
                    className="prose prose-lg max-w-none text-foreground/90" 
                    dangerouslySetInnerHTML={{ __html: article.fullContent.replace(/\n/g, '<p></p>') }}
                />
            </div>
        </article>
    );
};

const ArticleList = ({ articles }: { articles: NewsItem[] }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">News & Updates Preview</h2>
        <p className="mt-2 text-muted-foreground">Select an article to preview from the Content Management settings.</p>
        <Button asChild className="mt-6">
            <Link href="/admin/settings/news">Go to News Management</Link>
        </Button>
    </div>
);


export default function NewsPreviewPage() {
    const searchParams = useSearchParams();
    const articleSlug = searchParams.get('slug');

    if (articleSlug) {
        return <ArticlePreview slug={articleSlug} />;
    }

    return <ArticleList articles={[]} />;
}
