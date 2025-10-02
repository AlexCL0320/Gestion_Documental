'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Home, FileText, Users, Settings, BarChart2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const items = [
  { title: 'Dashboard', href: '/', icon: Home },
  { title: 'Documentos', href: '/documents', icon: FileText },
  { title: 'Docentes', href: '/teachers', icon: Users },
  { title: 'Entregas', href: '/compliance', icon: BarChart2 },
  { title: 'Configuración', href: '/settings', icon: Settings },
];

interface SidebarNavProps {
  isCollapsed?: boolean;
}

export function SidebarNav({ isCollapsed = false }: SidebarNavProps) {
  const pathname = usePathname();

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <div className="flex flex-col items-center gap-1">
          {items.map((item) => (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'relative h-12 w-12 text-white hover:bg-[#f3aa20] hover:text-black',
                    pathname === item.href &&
                      'bg-[#f3aa20] text-black'
                  )}
                >
                  {pathname === item.href && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-sidebar-ring" />}
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    );
  }

  return (
      <div
        className={cn(
          'flex flex-col gap-1',
          isCollapsed ? 'items-center' : 'items-stretch'
        )}
      >
        {items.map((item) =>(
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'justify-start gap-4 px-4 py-6 relative text-white',
                pathname === item.href
                  ? 'bg-[#f3aa20] text-black hover:bg-[#f3aa20]/90 hover:text-black'
                  : 'hover:bg-[#f3aa20] hover:text-black',
                'text-sm'
              )}
            >
              {pathname === item.href && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-sidebar-ring" />}
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        )}
      </div>
  );
}
