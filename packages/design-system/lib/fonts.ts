import { cn } from '@repo/design-system/lib/utils';
import {
  Archivo,
  Fraunces,
  Inter_Tight,
  JetBrains_Mono,
  Source_Serif_4,
} from 'next/font/google';

// Display sans (Direction A: Operating System)
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

// Editorial serif (Direction B alt + italic emphasis)
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

// Body sans
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Mono for stats / code / labels
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// Secondary serif (used in Direction B)
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif-2',
  display: 'swap',
});

export const fonts = cn(
  archivo.variable,
  fraunces.variable,
  interTight.variable,
  jetBrainsMono.variable,
  sourceSerif.variable,
  'touch-manipulation font-sans antialiased'
);
