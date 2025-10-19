"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMultibandVolume } from "../ui/bar-visualizer";
import { Matrix } from "../ui/matrix";
import { monoFont } from "@/utils/fonts";

interface AudioProps {
  title: string;
  url: string;
}

export default function Audio({ title, url }: AudioProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);

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

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize audio:", error);
        setIsLoading(false);
      }
    };

    initializeAudio();

    // Cleanup
    return () => {
      audioRef.current?.pause();
      sourceNodeRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [url]);

  const togglePlayPause = async () => {
    if (!audioRef.current || !audioContextRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Resume audio context if suspended
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const frequencyBands = useMultibandVolume(mediaStream, {
    bands: 20,
    loPass: 2,
    hiPass: 400,
    updateInterval: 32,
    analyserOptions: {
      fftSize: 2048,
      smoothingTimeConstant: 0.1,
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
        rows={20}
        cols={20}
        mode="vu"
        levels={frequencyBands}
        size={10}
        gap={2}
        ariaLabel={`Audio frequency visualization for ${title}`}
      />
    </div>
  );
}
