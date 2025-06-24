import type { HeaderProps } from '@/types/data';
import { WifiIcon, WifiOffIcon } from 'lucide-react';

export default function Header({ networkStatus, currentTime }: HeaderProps) {
  const NetworkIcon = networkStatus === 'offline' ? WifiOffIcon : WifiIcon;
  const statusColor =
    networkStatus === 'offline' ? 'text-red-500' : 'text-green-500';

  return (
    <header className='sticky top-0 z-10 bg-white shadow-sm'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2' aria-label='Network status'>
            <NetworkIcon
              className={`w-5 h-5 ${statusColor} truncate`}
              aria-hidden='true'
            />
            <span className='text-sm font-medium capitalize' aria-live='polite'>
              {networkStatus}
            </span>
          </div>
        </div>

        <div className='flex-1 text-center'>
          <h1 className='text-lg font-semibold'>Music Player</h1>
        </div>

        <div
          className='flex-1 text-right'
          aria-label={`Current time: ${currentTime}`}
        >
          <time
            dateTime={new Date().toISOString()}
            className='text-sm font-medium'
            aria-live='polite'
          >
            {currentTime}
          </time>
        </div>
      </div>
    </header>
  );
}
