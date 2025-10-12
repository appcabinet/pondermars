"use client";

import { useAtom } from "jotai";
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
    <Dialog open={imageDialog !== null} onOpenChange={() => setImageDialog(null)}>
      <DialogContent
        className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none w-full"
        // showCloseButton={true}
      >
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
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-sm"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
