import { useAtomValue, useSetAtom } from "jotai";
import {
  songPlayingFamily,
  togglePlayPauseAtom,
} from "@/atoms/audio-player";

export function useAudioPlayer(url: string) {
  const isPlaying = useAtomValue(songPlayingFamily(url));
  const toggle = useSetAtom(togglePlayPauseAtom);

  return {
    isPlaying,
    togglePlayPause: () => toggle(url),
  };
}
