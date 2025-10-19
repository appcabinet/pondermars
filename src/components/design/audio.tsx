"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { AudioScrubber } from "../ui/waveform";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

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

        // Create analyser for waveform data
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        // Connect: source -> analyser -> destination -> speakers
        sourceNode.connect(analyser);
        sourceNode.connect(destination);
        sourceNode.connect(audioContext.destination);

        // Set up event listeners for progress tracking
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
          // Generate static waveform data
          generateWaveformData();
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

  const generateWaveformData = async () => {
    try {
      // Fetch the audio file
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();

      // Create a temporary audio context for decoding
      const tempContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await tempContext.decodeAudioData(arrayBuffer);

      // Get the raw audio data from the first channel
      const rawData = audioBuffer.getChannelData(0);
      const bars = 100;
      const blockSize = Math.floor(rawData.length / bars);
      const data: number[] = [];

      // Sample the audio data and calculate RMS (root mean square) for each bar
      for (let i = 0; i < bars; i++) {
        const start = blockSize * i;
        let sum = 0;

        for (let j = 0; j < blockSize; j++) {
          const sample = rawData[start + j] || 0;
          sum += sample * sample;
        }

        const rms = Math.sqrt(sum / blockSize);
        // Normalize and scale to 0.15-0.95 range for better visibility
        const normalized = Math.min(0.95, Math.max(0.15, rms * 2.5));
        data.push(normalized);
      }

      setWaveformData(data);
      tempContext.close();
    } catch (error) {
      console.error("Failed to generate waveform:", error);
      // Fallback to random data if waveform generation fails
      const fallbackData = Array.from({ length: 100 }, () => 0.3 + Math.random() * 0.4);
      setWaveformData(fallbackData);
    }
  };

  const handleSeek = (newTime: number) => {
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
              : "bg-transparent text-muted-foreground",
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

      <AudioScrubber
        data={waveformData}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        height={128}
        barWidth={3}
        barGap={1}
        className="w-full"
      />

      <div className="w-full flex items-center justify-between pt-2">
        <span className={cn("text-sm tabular-nums", monoFont.className)}>
          {formatTime(currentTime)}
        </span>
        <span className={cn("text-sm tabular-nums", monoFont.className)}>
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
