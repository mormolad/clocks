import './globals.css';
import { Inter } from 'next/font/google';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Часы в разных часовых поясах',
  description: 'Тестовое задание для Frontend React разработчика',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
