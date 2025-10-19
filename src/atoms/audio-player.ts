import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

// TypeScript interface for audio refs
export interface AudioRefs {
  audioRef: HTMLAudioElement | null;
  audioContextRef: AudioContext | null;
  sourceNodeRef: MediaElementAudioSourceNode | null;
  destinationRef: MediaStreamAudioDestinationNode | null;
}

// Module-level registry for audio refs (not reactive)
const audioRefsRegistry = new Map<string, AudioRefs>();

// Atom family - one atom per song URL for playing state
export const songPlayingFamily = atomFamily((url: string) => atom(false));

// Global atom tracking which song is currently playing
export const currentlyPlayingSongAtom = atom<string | null>(null);

// Write-only atom to handle play/pause with auto-pause logic
export const togglePlayPauseAtom = atom(
  null,
  async (get, set, url: string) => {
    const isCurrentlyPlaying = get(songPlayingFamily(url));
    const refs = audioRefsRegistry.get(url);

    if (!refs?.audioRef || !refs?.audioContextRef) return;

    if (isCurrentlyPlaying) {
      // Pause this song
      refs.audioRef.pause();
      set(songPlayingFamily(url), false);
      set(currentlyPlayingSongAtom, null);
    } else {
      // Pause any currently playing song
      const currentlyPlaying = get(currentlyPlayingSongAtom);
      if (currentlyPlaying && currentlyPlaying !== url) {
        const currentRefs = audioRefsRegistry.get(currentlyPlaying);
        if (currentRefs?.audioRef) {
          currentRefs.audioRef.pause();
          set(songPlayingFamily(currentlyPlaying), false);
        }
      }

      // Resume audio context if suspended
      if (refs.audioContextRef.state === "suspended") {
        await refs.audioContextRef.resume();
      }

      // Play this song
      await refs.audioRef.play();
      set(songPlayingFamily(url), true);
      set(currentlyPlayingSongAtom, url);
    }
  }
);

// Helper functions to manage refs registry
export const registerAudioRefs = (url: string, refs: AudioRefs) => {
  audioRefsRegistry.set(url, refs);
};

export const unregisterAudioRefs = (url: string) => {
  audioRefsRegistry.delete(url);
};

export const updateAudioRefs = (url: string, refs: Partial<AudioRefs>) => {
  const existing = audioRefsRegistry.get(url);
  if (existing) {
    audioRefsRegistry.set(url, { ...existing, ...refs });
  }
};
