'use client';
import { UserNav } from '@/components/layout/user-nav';
import { GenerateReport } from '../dashboard/generate-report';

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header 
      className="flex h-14 items-center gap-4 px-4 text-sidebar-foreground lg:h-[60px] lg:px-6"
      style={{
          background: 'linear-gradient(to left, #242424, #4a4a4a)'
      }}
    >
      {children}
      <div className="w-full flex-1">
        {/* You can add a global search bar here if needed */}
      </div>
      <div className="flex items-center gap-4">
        <GenerateReport />
        <UserNav />
      </div>
    </header>
  );
}
