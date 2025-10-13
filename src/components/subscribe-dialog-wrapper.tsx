"use client";

import { useEffect, useState } from "react";
import SubscribeDialog from "@/components/subscribe";

export default function SubscribeDialogWrapper() {
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOpen(true);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return <SubscribeDialog open={open} onOpenChange={setOpen} />;
}
