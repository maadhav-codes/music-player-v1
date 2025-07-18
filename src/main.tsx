import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from '@routes/root';
import Home from '@routes/home';
import ErrorBoundary from '@routes/error';
import '@/index.css';
import PlaylistTab from './routes/playlist';
import BrowseTab from './routes/browser';

async function loadRootData() {
  return {
    appName: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.VITE_VERSION,
    apiUrl: import.meta.env.API_URL,
  };
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    loader: loadRootData,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: '/playlist', Component: PlaylistTab },
      { path: 'browse', Component: BrowseTab },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
