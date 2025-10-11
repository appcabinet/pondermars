import { Instrument_Serif, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

export const bodyFont = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

export const monoFont = localFont({
  src: '../../public/PaperMono-Regular.ttf',
  variable: "--font-paper-mono",
});

export const titleFont = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});