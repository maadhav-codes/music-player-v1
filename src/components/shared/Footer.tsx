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
          'border-transparent flex flex-col items-center justify-center gap-2 rounded-md border p-3 transition-all duration-200',
          'hover:border-primary focus:outline-none',
          'group relative overflow-hidden',
          {
            'bg-primary text-primary-foreground': isActive,
            'text-muted-foreground hover:text-primary': !isActive,
          }
        )}
        aria-current={isActive ? 'page' : undefined}
        aria-label={`Navigate to ${label}`}
      >
        <div className='relative z-10 flex flex-col items-center gap-1'>
          <Icon
            className={cn(
              'h-5 w-5 transition-transform duration-200 group-hover:scale-110',
              isActive && 'drop-shadow-sm'
            )}
            aria-hidden='true'
          />
          <span
            className={cn(
              'hidden sm:block',
              'text-xs font-medium transition-all duration-200',
              isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
            )}
          >
            {label}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <nav className='glass-effect border-border/50 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-xl'>
      <div className='container mx-auto px-4 py-3'>
        <ul className='flex justify-around gap-2'>
          {tabs.map(tab => (
            <NavTabs key={tab.id} {...tab} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
