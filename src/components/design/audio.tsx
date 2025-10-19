"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMultibandVolume } from "../ui/bar-visualizer";
import { Matrix } from "../ui/matrix";
import { monoFont } from "@/utils/fonts";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import {
  registerAudioRefs,
  unregisterAudioRefs,
  updateAudioRefs,
} from "@/atoms/audio-player";

interface AudioProps {
  title: string;
  url: string;
}

export default function Audio({ title, url }: AudioProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);

  const { isPlaying, togglePlayPause } = useAudioPlayer(url);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Create audio element
        const audio = new window.Audio(url);
        audio.crossOrigin = "anonymous";
        audioRef.current = audio;

        // Create audio context
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        // Create source node from audio element
        const sourceNode = audioContext.createMediaElementSource(audio);
        sourceNodeRef.current = sourceNode;

        // Create destination for MediaStream
        const destination = audioContext.createMediaStreamDestination();
        destinationRef.current = destination;

        // Connect: source -> destination -> speakers
        sourceNode.connect(destination);
        sourceNode.connect(audioContext.destination);

        // Set MediaStream for visualizer
        setMediaStream(destination.stream);

        // Update refs in Jotai store
        updateAudioRefs(url, {
          audioRef: audioRef.current,
          audioContextRef: audioContextRef.current,
          sourceNodeRef: sourceNodeRef.current,
          destinationRef: destinationRef.current,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize audio:", error);
        setIsLoading(false);
      }
    };

    initializeAudio();

    return () => {
      audioRef.current?.pause();
      sourceNodeRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [url]);

  useEffect(() => {
    registerAudioRefs(url, {
      audioRef: audioRef.current,
      audioContextRef: audioContextRef.current,
      sourceNodeRef: sourceNodeRef.current,
      destinationRef: destinationRef.current,
    });

    return () => {
      unregisterAudioRefs(url);
    };
  }, [url]);

  const frequencyBands = useMultibandVolume(mediaStream, {
    bands: 16,
    loPass: 40,
    hiPass: 1000,
    updateInterval: 32,
    analyserOptions: {
      fftSize: 4096,
      smoothingTimeConstant: 0.05,
    },
  })

  return (
    <div className="relative flex flex-col items-center gap-4 p-6 border">
      <h3 className={cn("text-lg font-semibold w-full text-left", monoFont.className)}>{title}</h3>
      <button
        onClick={togglePlayPause}
        disabled={isLoading}
        className={cn(
          "absolute top-4 right-4 p-2 border transition-colors hover:cursor-pointer",
          "flex items-center justify-center",
          "h-10 w-10",
          isPlaying
            ? "bg-accent-foreground text-white border-white/10"
            : "bg-transparent hover:bg-gray-100",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <Play className="w-4 h-4" fill="currentColor" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" fill="currentColor" />
        ) : (
          <Play className="w-4 h-4" fill="currentColor" />
        )}
      </button>

      <Matrix
        rows={12}
        cols={16}
        mode="vu"
        levels={frequencyBands}
        size={12}
        gap={2}
        ariaLabel={`Audio frequency visualization for ${title}`}
      />
    </div>
  );
}
