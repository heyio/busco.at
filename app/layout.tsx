import Footer from '@/components/organisms/footer';
import './globals.css';
import { Urbanist } from 'next/font/google';
import { Metadata } from 'next';

const urbanist = Urbanist({ subsets: ['latin'], display: 'swap' });

const defaultUrl = process.env.URL
  ? `https://${process.env.URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: 'Busco',
    template: '%s - Busco',
  },
  description: 'Busco brings you everywhere!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={urbanist.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
