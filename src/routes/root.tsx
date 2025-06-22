import { Link, Outlet, useLoaderData } from 'react-router';
import ReactIcon from '@assets/react-icon.svg?react';

export default function Root() {
  const data = useLoaderData();

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <header className='border-b border-slate-600 bg-slate-800/90 px-6 py-4 shadow-lg backdrop-blur-sm'>
        <div className='mx-auto flex max-w-6xl items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <ReactIcon className='animate-spin-slow h-8 w-8 text-blue-400' />

              <div className='absolute inset-0 animate-pulse rounded-full bg-blue-400/20 blur'></div>
            </div>

            <div>
              <h1 className='text-2xl font-bold text-slate-50'>
                {data.appName}
              </h1>
              <p className='text-xs text-slate-400'>
                🌌 Interdimensional Portal v{data.version}
              </p>
            </div>
          </div>

          <nav>
            <ul className='flex items-center gap-8'>
              <li>
                <Link
                  to='/'
                  className='relative font-medium text-slate-300 transition-colors hover:text-blue-400'
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to='/nowhere-to-go'
                  className='relative font-medium text-slate-300 transition-colors hover:text-blue-400'
                >
                  Nowhere
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className='mx-auto max-w-6xl px-6 py-12 text-center"'>
        <Outlet />
      </main>
    </div>
  );
}
