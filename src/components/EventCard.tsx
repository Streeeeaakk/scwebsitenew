
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface EventCardProps {
  event: {
    month: string;
    day: string;
    image: string;
    title: string;
    description: string;
    href: string;
  };
  useCard?: boolean;
}

export function EventCard({ event, useCard = true }: EventCardProps) {
  const content = (
    <div className="flex gap-4 items-start h-full">
      <div className="text-center w-16 shrink-0 pt-1">
        <p className="text-md font-bold text-primary">{event.month}</p>
        <p className="text-3xl font-bold text-foreground">{event.day}</p>
      </div>
      <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
          {event.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
      </div>
    </div>
  );

  const wrapperClass = "group block bg-card/80 backdrop-blur-sm p-4 rounded-lg hover:bg-card transition-colors h-full";

  if (useCard) {
    return (
      <Link href={event.href} className="group block h-full">
        <Card className={cn(wrapperClass, 'border')}>
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Link href={event.href} className={cn(wrapperClass, 'border')}>
        {content}
    </Link>
  );
}
