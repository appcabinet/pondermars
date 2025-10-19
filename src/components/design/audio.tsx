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
import { Progress } from "@/components/ui/progress";

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

        // Set up event listeners for progress tracking
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });

        // Trigger loading of audio metadata
        audio.load();

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
    hiPass: 700,
    updateInterval: 50,
    analyserOptions: {
      fftSize: 2048,
      smoothingTimeConstant: 0.2,
    },
  })

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const newTime = percentage * duration;

    if (audioRef.current && !isNaN(newTime)) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex flex-col items-center gap-4 p-6 border">
      <div className="flex items-center justify-between w-full">
        <h3 className={cn("text-lg font-semibold w-full text-left", monoFont.className)}>{title}</h3>
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className={cn(
            "border transition-colors hover:cursor-pointer",
            "flex items-center justify-center",
            "h-10 w-10 shrink-0",
            isPlaying
              ? "bg-accent-foreground text-white border-white/10"
              : "bg-card text-muted-foreground",
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
      </div>

      <Matrix
        rows={11}
        cols={16}
        mode="vu"
        palette={{
          on: "var(--accent-foreground)",
          off: "var(--muted-foreground)"
        }}
        levels={frequencyBands}
        size={15}
        gap={2}
        ariaLabel={`Audio frequency visualization for ${title}`}
      />

      <div className="w-full flex items-center gap-4">
        <div
          onClick={handleSeek}
          className={cn(
            "flex-1 cursor-pointer",
            isLoading && "pointer-events-none opacity-50"
          )}
        >
          <Progress
            value={duration > 0 ? (currentTime / duration) * 100 : 0}
            className="h-1"
          />
        </div>
        <span className={cn("text-sm tabular-nums text-right", monoFont.className)}>
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
