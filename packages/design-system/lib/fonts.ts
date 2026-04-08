import { cn } from '@repo/design-system/lib/utils';
import { Instrument_Serif, Plus_Jakarta_Sans, Source_Sans_3, JetBrains_Mono } from 'next/font/google';

// Display/hero headings: serif font
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
});

// Headings and UI: clean sans-serif
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Body copy: readable sans-serif
const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Monospace for stats/numbers
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const fonts = cn(
  instrumentSerif.variable,
  plusJakartaSans.variable,
  sourceSans3.variable,
  jetBrainsMono.variable,
  'touch-manipulation font-sans antialiased'
);
