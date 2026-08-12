import { Inter } from 'next/font/google';
import '@/assets/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthWrapper from '@/components/AuthWrapper';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Booking App || Book an apartment',
  description: 'Book apartment for your holiday',
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <html lang='en'>
        <body className={inter.className}>
          <Header />
          <main className='mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8'>
            {children}
            <Toaster richColors position='top-right' />
          </main>
          <Footer />
        </body>
      </html>
    </AuthWrapper>
  );
}
