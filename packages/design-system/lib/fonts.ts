import { cn } from '@repo/design-system/lib/utils';
import {
  Anton,
  Bowlby_One,
  Caveat,
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
} from 'next/font/google';

// Editorial serif — italic emphasis, body display
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

// UI + body sans
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Stamped chunky display ("BIGWORD" headlines)
const bowlbyOne = Bowlby_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-stamp',
  display: 'swap',
});

// Condensed display — eyebrows, button labels, all-caps small UI
const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cond',
  display: 'swap',
});

// Monospace for stats/numbers
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

// Handwritten accent
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-script',
  display: 'swap',
});

export const fonts = cn(
  instrumentSerif.variable,
  interTight.variable,
  bowlbyOne.variable,
  anton.variable,
  jetBrainsMono.variable,
  caveat.variable,
  'touch-manipulation font-sans antialiased'
);
