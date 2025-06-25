import type { HeaderProps } from '@/types/data';
import { WifiIcon, WifiOffIcon } from 'lucide-react';

export default function Header({ networkStatus, currentTime }: HeaderProps) {
  const NetworkIcon = networkStatus === 'offline' ? WifiOffIcon : WifiIcon;
  const statusColor =
    networkStatus === 'offline' ? 'text-red-500' : 'text-emerald-500';

  return (
    <header className='glass-effect border-border/50 sticky top-0 z-50 border-b backdrop-blur-xl'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <div
          className='bg-muted/50 border-border/50 flex items-center gap-2 rounded-sm border px-3 py-2'
          aria-label='Network status'
        >
          <NetworkIcon
            className={`w-4 h-4 ${statusColor}`}
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize' aria-live='polite'>
            {networkStatus}
          </span>
        </div>

        <div className='min-w-0 flex-2 text-center'>
          <h1 className='text-heading text-primary truncate font-semibold'>
            Music Player
          </h1>
        </div>

        <div
          className='bg-muted/50 border-border/50 flex items-center rounded-sm border px-3 py-2'
          aria-label={`Current time: ${currentTime}`}
        >
          <time
            dateTime={new Date().toISOString()}
            className='text-sm font-mono font-medium'
            aria-live='polite'
          >
            {currentTime}
          </time>
        </div>
      </div>
    </header>
  );
}
