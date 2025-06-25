import { Outlet } from 'react-router';

import { useEffect, useState } from 'react';
import type { NetworkStatus } from '@/types/data';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function Root() {
  const [status, setStatus] = useState<NetworkStatus>('offline');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header networkStatus={status} currentTime={currentTime} />

      <main className='container mx-auto flex h-full flex-col gap-4 p-4'>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
