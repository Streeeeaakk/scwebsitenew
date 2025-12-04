
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Settings, Home, LogOut } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminHeader() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const { user, logout } = useAdminAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === '/admin') return pathname === href;
    if (href === '/admin/settings') return pathname.startsWith('/admin/settings');
    return pathname === href;
  };
  
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-40">
      {isClient && (
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-16 items-center border-b px-6">
                <Logo />
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                  {menuItems.map((item) => (
                      <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                          "flex items-center gap-3 rounded-md p-2 text-base font-semibold hover:bg-muted",
                          isLinkActive(item.href) ? "bg-muted text-foreground" : "text-muted-foreground"
                          )}
                      >
                          <item.icon className="h-5 w-5" />
                          {item.label}
                      </Link>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div className="w-full flex-1">
        {/* Can add search or other header items here */}
      </div>

      <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" onClick={logout} className="flex items-center gap-2">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
      </div>
    </header>
  );
}
