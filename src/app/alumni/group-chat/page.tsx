
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Camera, Mic, Smile, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const initialMessages = [
  {
    id: 1,
    author: { name: 'Betty Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' },
    text: "Hey everyone! Can't believe it's been over 10 years. How's everyone doing?",
    time: "10:30 AM"
  },
  {
    id: 2,
    author: { name: 'Dennis Han', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop' },
    text: "Betty! So good to hear from you. I'm doing well, working as a software engineer in SF now. You?",
    time: "10:32 AM"
  },
    {
    id: 3,
    author: { name: 'You', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop' },
    text: "Wow, small world! I'm in SF too. We should definitely grab coffee sometime.",
    time: "10:33 AM",
    isCurrentUser: true,
  },
  {
    id: 4,
    author: { name: 'Betty Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' },
    text: "Yes, absolutely! I'll DM you.",
    time: "10:34 AM"
  }
];

export default function GroupChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      author: { name: 'You', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop' },
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col bg-muted/40">
      <header className="flex h-16 items-center border-b bg-background px-4 shrink-0">
        <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/alumni/feed">
                <ArrowLeft className="h-5 w-5" />
            </Link>
        </Button>
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" />
                <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="font-semibold text-lg text-foreground">Batch 2010 Group</h2>
                <p className="text-sm text-muted-foreground">Active now</p>
            </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.isCurrentUser ? 'justify-end' : ''}`}>
              {!msg.isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.author.avatar} />
                  <AvatarFallback>{msg.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-xs md:max-w-md rounded-2xl p-3 ${msg.isCurrentUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background rounded-bl-none'}`}>
                {!msg.isCurrentUser && <p className="text-xs font-bold mb-1 text-primary">{msg.author.name}</p>}
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="p-4 border-t bg-background shrink-0">
        <div className="relative flex items-center gap-2">
          <Button variant="ghost" size="icon"><Camera /></Button>
          <Input
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-muted"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button variant="ghost" size="icon"><Mic /></Button>
          <Button variant="ghost" size="icon"><Smile /></Button>
          <Button size="icon" onClick={handleSendMessage} className="rounded-full">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
