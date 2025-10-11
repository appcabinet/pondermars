import {
  Inconsolata,
  Instrument_Serif,
  Source_Sans_3,
} from "next/font/google";

const instrumentSerifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const sourceSansFont = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});


const inconsolataFont = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const titleFont = inconsolataFont;
export const bodyFont = sourceSansFont;
export const monoFont = inconsolataFont;
