"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { imageDialogAtom } from "@/atoms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ImageDialog() {
  const [imageDialog, setImageDialog] = useAtom(imageDialogAtom);

  return (
    <Dialog
      open={imageDialog !== null}
      onOpenChange={() => setImageDialog(null)}
    >
      <DialogContent
        className="p-0 border-none bg-transparent shadow-none max-w-none sm:max-w-none w-screen h-screen"
        showCloseButton={false}
      >
        <DialogClose
          className="absolute top-4 md:top-6 right-4 md:right-6 rounded-full bg-black/20 z-50 w-10 h-10 flex items-center justify-center hover:cursor-pointer hover:bg-black/50 transition-all duration-100"
          onClick={() => setImageDialog(null)}
        >
          <XIcon className="text-white/70" />
        </DialogClose>
        <DialogTitle className="sr-only">
          {imageDialog?.alt || "Image preview"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Full size image view
        </DialogDescription>
        {imageDialog && (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={imageDialog.src}
              alt={imageDialog.alt}
              width={2000}
              height={2000}
              quality={100}
              className="max-w-[90vw] max-h-[90vh] w-full h-full object-contain rounded-sm cursor-zoom-out"
              onClick={() => setImageDialog(null)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
