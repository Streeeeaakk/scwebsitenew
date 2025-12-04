
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/Logo';
import { NavMenu } from './NavMenu';
import { TopHeader } from './TopHeader';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full bg-background/95 backdrop-blur-sm z-40">
      <TopHeader />
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />

        <div className="hidden lg:flex items-center justify-end flex-1 gap-4">
          <NavMenu />
        </div>

        <div className="lg:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background w-full p-0">
              <SheetHeader className="sr-only">
                  <SheetTitle>Main Menu</SheetTitle>
                  <SheetDescription>Navigation links for the website.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4">
                  <Logo />
                </div>
                <nav className="flex-1 flex flex-col gap-2 p-4">
                   <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 rounded-md hover:bg-muted">About</Link>
                   <Link href="/academics" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 rounded-md hover:bg-muted">Academics</Link>
                   <Link href="/admissions" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 rounded-md hover:bg-muted">Admissions</Link>
                   <Link href="/scholarships" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 rounded-md hover:bg-muted">Scholarships</Link>
                   <Link href="/student-life" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 rounded-md hover:bg-muted">Student Life</Link>
                   <Link href="/alumni" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 rounded-md hover:bg-muted">Alumni</Link>
                   <Link href="/news" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 rounded-md hover:bg-muted">News</Link>
                   <Link href="/careers" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 rounded-md hover:bg-muted">Careers</Link>
                </nav>
                <div className="p-4 border-t flex flex-col gap-2">
                    <Button asChild className="w-full" size="lg">
                      <Link href="/admissions">Apply Now</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">Contact</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
