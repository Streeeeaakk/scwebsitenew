
'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AuthProvider, AdminAuthGuard } from '@/hooks/use-admin-auth';
import { useStoredImage } from '@/components/admin/ImageManager';
import { useEffect } from 'react';

// This is a client component, but we can export metadata from it.
// However, to use the hook, we need a small client component wrapper.
function AdminMetadata() {
    const faviconUrl = useStoredImage('favicon');
    
    useEffect(() => {
        if (faviconUrl) {
            let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = faviconUrl;
        }
        // Set document title here as well
        document.title = "Admin | Southland College";
    }, [faviconUrl]);

    return null;
}


function AdminLayoutComponent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    return (
        <AdminAuthGuard>
            <AdminMetadata />
            {isLoginPage ? (
              <div className="bg-muted/40 min-h-screen">{children}</div>
            ) : (
              <div className="bg-muted/40 min-h-screen">
                <AdminSidebar />
                <div className="flex flex-col lg:pl-64">
                  <AdminHeader />
                  <main className="flex-1 p-4 md:p-8">
                    {children}
                  </main>
                </div>
              </div>
            )}
        </AdminAuthGuard>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <AdminLayoutComponent>{children}</AdminLayoutComponent>
    </AuthProvider>
  );
}
