import { atom } from "jotai";
import type { StaticImageData } from "next/image";

export const imageDialogAtom = atom<{
  src: StaticImageData | string;
  alt: string;
} | null>(null);
