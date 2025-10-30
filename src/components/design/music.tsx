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
        You can listen to all of my music&nbsp;
        <a
          href="https://open.spotify.com/artist/5w22L9c15647459QBpzE8F"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-foreground underline"
        >
          here
        </a>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Audio
          title="Before I Fall"
          url="https://lhfsdw7dl5.ucarecd.net/51824433-c312-4f18-ac6c-d4c5539de0f4/PonderMarsBeforeIFall16bit441khz.mp3"
        />
        <Audio
          title="The Intergalactic Forest"
          url="https://lhfsdw7dl5.ucarecd.net/3be008da-933a-4fd1-bd6e-3b0ebbe4a800/PonderMarsIntergalacticForestMaster.mp3"
        />
        <Audio
          title="Bacterium"
          url="https://lhfsdw7dl5.ucarecd.net/e8783021-6ef9-433e-b8d8-5628da093d0e/PonderMarsBacteriumFinalMaster441k16bit.mp3"
        />
        <Audio
          title="Earthquake"
          url="https://lhfsdw7dl5.ucarecd.net/e9eb796c-4e20-4250-bb2b-f6597871426e/PonderMarsMoneyTroubles.mp3"
        />
      </div>
    </div>
  );
}

