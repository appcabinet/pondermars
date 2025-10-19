"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import SubscribeDialog from "@/components/subscribe";

const hasSeenSubscribeDialogAtom = atomWithStorage(
  "hasSeenSubscribeDialog",
  false,
);

export default function SubscribeDialogWrapper() {
  const [open, setOpen] = useState(false);
  const [hasSeen, setHasSeen] = useAtom(hasSeenSubscribeDialogAtom);

  useEffect(() => {
    if (hasSeen) {
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
      setHasSeen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasSeen, setHasSeen]);

  return <SubscribeDialog open={open} onOpenChange={setOpen} />;
}
