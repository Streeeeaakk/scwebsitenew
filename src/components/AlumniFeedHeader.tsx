
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home, Users, MessageCircle, Bell, User, Video, Store, Gamepad2, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';


export function AlumniFeedHeader() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/alumni/portal');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-12 h-14 items-center gap-4 border-b bg-background px-4">
        {/* Left Section: Logo & Search */}
        <div className="col-span-6 md:col-span-3 flex items-center gap-2">
            <Link href="/alumni/feed">
                <Logo isUnlinked />
            </Link>
            <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search Network"
                    className="pl-8 sm:w-auto md:w-auto lg:w-56 rounded-full bg-muted"
                />
            </div>
        </div>

        {/* Center Section: Navigation Icons */}
        <nav className="col-span-6 hidden md:flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" className="w-24 h-14 rounded-none border-b-2 border-primary text-primary">
                <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="w-24 h-14 rounded-none text-muted-foreground hover:bg-secondary">
                <Video className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="w-24 h-14 rounded-none text-muted-foreground hover:bg-secondary">
                <Store className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="w-24 h-14 rounded-none text-muted-foreground hover:bg-secondary">
                <Users className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="w-24 h-14 rounded-none text-muted-foreground hover:bg-secondary">
                <Gamepad2 className="h-6 w-6" />
            </Button>
        </nav>

        {/* Right Section: Actions & Profile */}
        <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-2">
            <Button variant="secondary" size="icon" className="rounded-full md:hidden">
                <Search className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
                <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full p-0">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" />
                            <AvatarFallback>WP</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Wesley Hans M. Platil</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Nav Drawer */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-auto p-4">
                         <nav className="grid grid-cols-5 gap-2">
                            <Button variant="ghost" className="flex-col h-16 text-primary">
                                <Home className="h-6 w-6 mb-1" />
                                <span className="text-xs">Home</span>
                            </Button>
                             <Button variant="ghost" className="flex-col h-16 text-muted-foreground">
                                <Video className="h-6 w-6 mb-1" />
                                <span className="text-xs">Watch</span>
                            </Button>
                             <Button variant="ghost" className="flex-col h-16 text-muted-foreground">
                                <Store className="h-6 w-6 mb-1" />
                                <span className="text-xs">Market</span>
                            </Button>
                             <Button variant="ghost" className="flex-col h-16 text-muted-foreground">
                                <Users className="h-6 w-6 mb-1" />
                                <span className="text-xs">Groups</span>
                            </Button>
                             <Button variant="ghost" className="flex-col h-16 text-muted-foreground">
                                <Gamepad2 className="h-6 w-6 mb-1" />
                                <span className="text-xs">Gaming</span>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </header>
  );
}
