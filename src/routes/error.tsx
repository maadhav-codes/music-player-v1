import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-y-4'>
        <h1 className='my-5 mb-3 text-center text-4xl'>
          {error.status === 404
            ? '🌍 This world was not found!'
            : `🚫 Portal Error ${error.status}`}
        </h1>
        <p className='max-w-md text-center text-gray-600'>
          {error.status === 404
            ? "The dimension you're looking for doesn't exist in this universe."
            : 'Something went wrong while traveling between worlds.'}
        </p>
        <Link
          to='/'
          className='rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500'
        >
          🚀 Teleport Home
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-y-4'>
        <h1 className='my-5 mb-3 text-center text-4xl'>
          ⚠️ Reality Glitch Detected!
        </h1>
        <p className='max-w-md text-center text-gray-600'>
          The fabric of this digital world has been torn. Our engineers are
          working to repair the space-time continuum.
        </p>
        <details className='max-w-md text-sm text-gray-500'>
          <summary className='cursor-pointer hover:text-gray-700'>
            Technical Details
          </summary>
          <code className='mt-2 block rounded bg-gray-100 p-2 text-xs'>
            {error.message}
          </code>
        </details>
        <Link
          to='/'
          className='rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500'
        >
          🏠 Return to Safety
        </Link>
      </div>
    );
  } else {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-y-4'>
        <h1 className='my-5 mb-3 text-center text-4xl'>
          🌌 Unknown Dimension!
        </h1>
        <p className='max-w-md text-center text-gray-600'>
          You've stumbled into an uncharted realm. Even our interdimensional GPS
          is confused.
        </p>
        <Link
          to='/'
          className='rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500'
        >
          🧭 Navigate Home
        </Link>
      </div>
    );
  }
}
