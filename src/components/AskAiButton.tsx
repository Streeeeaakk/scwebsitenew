
'use client';

import { Bot } from 'lucide-react';
import { useChatStore } from '@/lib/chat-store';
import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from './ui/button';

export function AskAiButton({
  query,
  className,
}: {
  query: string;
  className?: string;
}) {
  const { setChatbotOpen, setPrefilledQuery } = useChatStore();

  const handleAskAiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPrefilledQuery(query);
    setChatbotOpen(true);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("gap-2", className)}
      onClick={handleAskAiClick}
    >
      <Bot className="h-4 w-4" />
      Ask AI
    </Button>
  );
}

    