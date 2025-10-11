import {
  Geist_Mono,
  Gelasio,
  IBM_Plex_Serif,
  Inconsolata,
  Instrument_Serif,
  Source_Sans_3,
} from "next/font/google";
import localFont from "next/font/local";

const instrumentSerifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const sourceSansFont = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

const paperMonoFont = localFont({
  src: "../../public/PaperMono-Regular.ttf",
  variable: "--font-paper-mono",
});

const geistMonoFont = Geist_Mono({
  subsets: ["latin"],
});

const ibmPlexSerifFont = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export const gelasioFont = Gelasio({
  subsets: ["latin"],
  weight: ["400"],
});

const inconsolataFont = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const titleFont = inconsolataFont;
export const bodyFont = sourceSansFont;
export const monoFont = geistMonoFont;
export const testFont = gelasioFont;
