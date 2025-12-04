
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, X, Loader2, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { chat } from '@/ai/flows/chat-flow';
import type { ChatInput } from '@/lib/schemas';
import Link from 'next/link';
import { useChatStore } from '@/lib/chat-store';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

// Map component message roles to Genkit flow roles
const roleMap = {
  user: 'user' as const,
  assistant: 'model' as const,
};

const renderMarkdown = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+|[^\s]+)\)/g;
    const parts: (string | { text: string, href: string })[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        const [fullMatch, linkText, href] = match;
        parts.push({ text: linkText, href });
        lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return (
        <div className="prose prose-sm prose-p:m-0 max-w-full text-current">
            {parts.map((part, index) => {
                if (typeof part === 'string') {
                     return part.split('\n').map((line, i) => (
                        <React.Fragment key={`${index}-${i}`}>
                            {line}
                            {i < part.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ));
                }
                const { text: linkText, href } = part;
                if (href.startsWith('/')) {
                    return (
                        <Link key={index} href={href} className="text-accent underline hover:text-accent/80 font-medium">
                            {linkText}
                        </Link>
                    );
                }
                return (
                    <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80 font-medium">
                        {linkText}
                    </a>
                );
            })}
        </div>
    );
};

export function Chatbot({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { prefilledQuery, setPrefilledQuery } = useChatStore();

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const flowInput: ChatInput = {
            history: messages.map(msg => ({
                role: roleMap[msg.role],
                content: [{ text: msg.text }],
            })),
            message: textToSend,
        };

        const result = await chat(flowInput);

        const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            text: result.message,
        };
        setMessages((prev) => [...prev, aiMessage]);

    } catch(error) {
        console.error("Chatbot error:", error);
        const errorMessage: Message = {
            id: `err-${Date.now()}`,
            role: 'assistant',
            text: "Sorry, I'm having trouble connecting to the AI. Please try again later.",
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && prefilledQuery) {
      handleSend(prefilledQuery);
      setPrefilledQuery('');
    }
  }, [isOpen, prefilledQuery, setPrefilledQuery]);


  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="icon"
                className="rounded-full w-16 h-16 shadow-lg"
                onClick={() => setIsOpen(true)}
                aria-label="Open chat"
              >
                <MessageSquare className="h-8 w-8" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-96 h-[85vh] sm:h-[calc(100vh-80px)] max-h-[700px] origin-bottom-right"
          >
            <Card className="h-full flex flex-col shadow-2xl rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-primary" />
                    <div>
                        <CardTitle>Southland AI Assistant</CardTitle>
                        <CardDescription>Your guide to the college</CardDescription>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4" viewportRef={viewportRef}>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot /></AvatarFallback>
                      </Avatar>
                      <div className="bg-secondary p-3 rounded-lg rounded-tl-none max-w-[85%]">
                        <p className="text-sm text-secondary-foreground">
                          Welcome to Southland College! I'm your AI assistant. How can I help you with admissions, programs, or student life today?
                        </p>
                      </div>
                    </div>

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'flex items-start gap-3',
                          message.role === 'user' && 'flex-row-reverse'
                        )}
                      >
                        {message.role === 'assistant' && (
                           <Avatar className="h-8 w-8 border">
                               <AvatarFallback><Bot /></AvatarFallback>
                           </Avatar>
                        )}
                        <div
                          className={cn(
                            'p-3 rounded-lg max-w-[85%] whitespace-pre-wrap break-words',
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground rounded-br-none'
                              : 'bg-secondary text-secondary-foreground rounded-tl-none'
                          )}
                        >
                            {renderMarkdown(message.text)}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 border">
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            <div className="bg-secondary p-3 rounded-lg rounded-tl-none">
                                <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                            </div>
                        </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <div className="p-4 border-t">
                <div className="relative">
                  <Input
                    placeholder="Ask a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    disabled={isLoading}
                    className="pr-12"
                  />
                  <Button
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

    