import { cn } from '@/lib/utils';
import type { Tabs } from '@/types/data';
import { FolderOpen, Home, ListMusic, Settings } from 'lucide-react';
import { Link, useMatch } from 'react-router';

const tabs: Tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'playlist', label: 'Playlist', icon: ListMusic },
  { id: 'browse', label: 'Browse', icon: FolderOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function NavTabs({ id, label, icon: Icon }: (typeof tabs)[0]) {
  const isActive = useMatch(id === 'home' ? '/' : `/${id}`);

  return (
    <li className='flex-1'>
      <Link
        to={id === 'home' ? '/' : `/${id}`}
        className={cn(
          'flex flex-col items-center justify-center gap-1 p-2 hover:text-blue-600 focus:outline-none',
          { 'text-blue-600': isActive }
        )}
        aria-current={isActive ? 'page' : undefined}
        aria-label={label}
      >
        <Icon className={cn('h-5 w-5')} aria-hidden='true' />
        <span className='hidden text-xs sm:block'>{label}</span>
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <nav className='fixed right-0 bottom-0 left-0 z-50 shadow-lg'>
      <ul className='flex justify-around px-4 py-3'>
        {tabs.map(tab => (
          <NavTabs key={tab.id} {...tab} />
        ))}
      </ul>
    </nav>
  );
}
