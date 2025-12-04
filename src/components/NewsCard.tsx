
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/lib/schemas';

interface NewsCardProps {
    item: NewsItem;
    index: number;
}

export function NewsCard({ item, index }: NewsCardProps) {
    return (
        <Link href={`/news/${item.slug}`} className="block group h-full">
            <Card className="h-full flex flex-col bg-card overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={item.hint}
                    />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        <span>{item.date}</span>
                    </p>
                    <h3 className="font-bold text-base leading-tight flex-grow mb-4 text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    <div className="mt-auto flex items-center font-semibold text-sm text-primary">
                        Read Story
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
