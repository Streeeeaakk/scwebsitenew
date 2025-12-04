'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/admin') return pathname === href;
    if (href === '/admin/settings') return pathname.startsWith('/admin/settings');
    return pathname === href;
  };

  return (
    <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 z-50 border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menuItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                "flex items-center gap-3 rounded-md p-2 text-sm font-semibold hover:bg-muted",
                isLinkActive(item.href) ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
            >
                <item.icon className="h-5 w-5" />
                {item.label}
            </Link>
        ))}
      </nav>
    </div>
  );
}
