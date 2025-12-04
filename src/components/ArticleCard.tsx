'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { NewsItem } from '@/lib/schemas';

interface ArticleCardProps {
    item: NewsItem;
}

export function ArticleCard({ item }: ArticleCardProps) {
    return (
        <Link href={`/news/${item.slug}`} className="block group">
            <div className="flex flex-col h-full">
                <div className="relative w-full aspect-[16/10] overflow-hidden mb-4">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={item.hint}
                    />
                </div>
                <h3 className="font-serif font-bold text-lg leading-tight text-foreground flex-grow mb-2 group-hover:underline">
                    {item.title}
                </h3>
                 <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                 </p>
            </div>
        </Link>
    );
}
