import { useSmoothScroll } from '@/utils/libs/lenis';
import React from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export default function Layout({ children }) {
  useSmoothScroll();
  return (
    <>
      <title>Animated TextArea Animation with speed controller</title>

      <div className={`${inter.className} ${spaceGrotesk.variable}`}>{children}</div>
    </>
  );
}
