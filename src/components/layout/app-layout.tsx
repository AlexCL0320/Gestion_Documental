

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from './header';
import { SidebarNav } from './sidebar-nav';
import { Icons } from '../icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { MobileSidebar } from './mobile-sidebar';
import { useMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isMobile = useMobile();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isMobile) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="flex flex-col">
                <Header>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                            >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col p-0">
                            <MobileSidebar />
                        </SheetContent>
                    </Sheet>
                </Header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
                {children}
                </main>
            </div>
        </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-10 hidden h-screen transition-all duration-300 md:block",
          isCollapsed ? "w-[80px]" : "w-[220px]"
        )}
        style={{
            background: 'linear-gradient(to bottom, #242424, #4a4a4a)'
        }}
        >
        <div className="flex h-full max-h-screen flex-col gap-2 relative">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-white"
            >
              <Icons.logo className="h-6 w-6 text-sidebar-primary" />
              <span className={cn("transition-opacity", isCollapsed && "opacity-0 w-0")}>Docentix</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start p-2">
              <SidebarNav isCollapsed={isCollapsed} />
            </nav>
          </div>
           <div className="mt-auto p-4">
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button
                            variant="ghost"
                            size="icon"
                            className="w-full justify-center text-white bg-sidebar-accent hover:bg-sidebar-accent/80 hover:text-white"
                            onClick={toggleSidebar}
                            >
                            <ChevronRight className={cn("h-5 w-5 transition-transform", !isCollapsed && "rotate-180")} />
                            <span className="sr-only">{isCollapsed ? 'Expandir' : 'Contraer'}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {isCollapsed ? 'Expandir' : 'Contraer'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
      </aside>
      <div className={cn(
          "flex flex-col h-screen",
          isCollapsed ? "md:ml-[80px]" : "md:ml-[220px]"
        )}>
        <Header />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
