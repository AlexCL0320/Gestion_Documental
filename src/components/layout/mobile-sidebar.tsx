
'use client';
import { SidebarNav } from './sidebar-nav';
import { Icons } from '../icons';
import Link from 'next/link';

export function MobileSidebar() {
  return (
    <>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <span className="">Docentix</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-2 text-sm lg:px-4 mt-4">
          <SidebarNav />
        </nav>
      </div>
    </>
  );
}
