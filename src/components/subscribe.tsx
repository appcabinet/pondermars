"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/app/actions/resend";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { titleFont } from "@/utils/fonts";

interface SubscribeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SubscribeDialog({
  open,
  onOpenChange,
}: SubscribeDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setIsSuccess(true);
      setEmail("");
      toast("You've been subscribed!", {
        description: "Check your email for confirmation.",
      });
      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
      }, 1000);
    } else {
      setError(result.error || "Failed to subscribe");
    }

    setIsSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={cn("text-2xl", titleFont.className)}>Subscribe</DialogTitle>
          <DialogDescription className="text-lg pb-1">
            I write about entrepreneurship, systems thinking, and philosophy.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {isSuccess ? (
            <div className="flex items-center gap-2">
              <p className="text-lg text-muted-foreground">
                You&apos;re subscribed!
              </p>
              <div className="bg-green-500 rounded-full p-1 h-5 w-5 flex items-center justify-center">
                <CheckIcon className="size-4 text-white" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Type your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="flex-1"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                Join
              </button>
            </form>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
