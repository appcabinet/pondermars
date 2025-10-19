"use client";

import Header from "../structure/header";
import Audio from "./audio";

export default function Music() {
  return (
    <div className="w-full flex flex-col gap-8">
      <Header>
        Sound Engineering
      </Header>

      <Audio
        title="YEAH"
        url="https://lhfsdw7dl5.ucarecd.net/b8b7f690-3c6e-4f27-a813-acd061523648/01Yeah.mp3"
      />
      <Audio
        title="10X"
        url="https://lhfsdw7dl5.ucarecd.net/f5a0aba7-90c6-45d5-9cdb-6780a9c00968/10x.mp3"
      />
      <Audio
        title="YEAH"
        url="https://lhfsdw7dl5.ucarecd.net/b8b7f690-3c6e-4f27-a813-acd061523648/01Yeah.mp3"
      />
      <Audio
        title="YEAH"
        url="https://lhfsdw7dl5.ucarecd.net/b8b7f690-3c6e-4f27-a813-acd061523648/01Yeah.mp3"
      />
    </div>
  )
}