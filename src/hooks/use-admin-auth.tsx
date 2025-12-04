
'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AuthProvider');
  }
  return context;
};

const SUPER_USER = {
  username: 'wesleyhans.platil@southlandcollege.edu.ph',
  password: 'sc.wesleyhans',
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a short delay to allow the app to initialize.
    // We are no longer checking session storage.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 50); // A small delay to prevent flashes of content
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(async (username: string, pass: string): Promise<boolean> => {
    if (username === SUPER_USER.username && pass === SUPER_USER.password) {
      const userData = { username };
      setUser(userData);
      // We no longer use sessionStorage to persist the login
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // We no longer use sessionStorage
  }, []);

  const value = { user, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AdminAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // If not logged in and not on the login page, redirect to login
    if (!user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }

    // If logged in and on the login page, redirect to the dashboard
    if (user && pathname === '/admin/login') {
      router.push('/admin');
    }
  }, [user, isLoading, pathname, router]);
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="w-full max-w-md space-y-4 p-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  // While redirecting, don't render children to avoid flash of content
  if (!user && pathname !== '/admin/login') {
    return null;
  }
  
  if (user && pathname === '/admin/login') {
      return null;
  }

  return <>{children}</>;
};
