'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type User = {
  name: string;
  email: string;
  avatarUrl: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  waitForUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPage = ['/login', '/forgot-password'].includes(pathname);

  useEffect(() => {
    const checkSession = () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem('docentix-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else if (!isPublicPage) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('docentix-user');
        if (!isPublicPage) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [pathname, isPublicPage, router]);

  const login = async (email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'jefatura.docencia@itoaxaca.edu.mx' && pass === 'default') {
          const userData: User = {
            name: 'Jefatura de Docencia',
            email: 'jefatura.docencia@itoaxaca.edu.mx',
            avatarUrl: PlaceHolderImages.find(img => img.id === 'head-of-dept')?.imageUrl ?? '',
          };
          localStorage.setItem('docentix-user', JSON.stringify(userData));
          setUser(userData);
          resolve();
        } else {
          reject(new Error('Correo electrónico o contraseña incorrectos.'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('docentix-user');
    setUser(null);
    router.push('/login');
  };

  const waitForUser = () => {
    return new Promise<void>((resolve) => {
      const check = () => {
        const storedUser = localStorage.getItem('docentix-user');
        if (storedUser) {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });
  };

  if (loading && !isPublicPage) {
     return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </div>
     )
  }

  const value = { user, loading, login, logout, waitForUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
