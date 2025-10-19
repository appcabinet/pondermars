"use client";

import { cn } from "@/lib/utils";
import Header from "../structure/header";
import Audio from "./audio";

export default function Music() {
  return (
    <div className="w-full flex flex-col gap-8">
      <Header>
        Sound Engineering
      </Header>

      <p className={cn("text-lg leading-tight")}>
        Software engineer, composer, and creative writer. Passionate about
        crafting digital experiences others love. Currently the founder & CTO
        of Maxed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Audio
          title="YEAH"
          url="https://lhfsdw7dl5.ucarecd.net/b8b7f690-3c6e-4f27-a813-acd061523648/01Yeah.mp3"
        />
        <Audio
          title="10X"
          url="https://lhfsdw7dl5.ucarecd.net/f5a0aba7-90c6-45d5-9cdb-6780a9c00968/10x.mp3"
        />
      </div>
    </div>
  )
}