
'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Chatbot } from '@/components/Chatbot';
import { useChatStore } from '@/lib/chat-store';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isChatbotOpen, setChatbotOpen } = useChatStore();

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Chatbot isOpen={isChatbotOpen} setIsOpen={setChatbotOpen} />
    </div>
  );
}
