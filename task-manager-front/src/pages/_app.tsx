import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/components/Providers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F2937',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </Providers>
  );
}

export default MyApp; 