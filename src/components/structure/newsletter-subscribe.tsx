"use client";

import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/resend";
import { Input } from "@/components/ui/input";
import Header from "./header";

export default function NewsletterSubscribe({ isArticle = false }: { isArticle?: boolean }) {
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
    } else {
      setError(result.error || "Failed to subscribe");
    }

    setIsSubmitting(false);
  }

  return (
    <div className="flex flex-col gap-8">
      <Header>{isArticle ? "Thank you for reading!" : "Get Updates From Me"}</Header>
      <p className="text-lg pb-1">
        Get a short email every time I release a new article. You can also find
        me on&nbsp;
        <Link
          href="https://github.com/pondermars"
          className="text-accent-foreground"
        >
          GitHub
        </Link>
        ,&nbsp;
        <Link
          href="https://x.com/pondermars"
          className="text-accent-foreground"
        >
          Twitter
        </Link>
        , and
        <Link
          href="https://instagram.com/_marcelo.app"
          className="text-accent-foreground"
        >
          {" "}
          Instagram
        </Link>
        .
      </p>
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
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
            className="w-[280px]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            Join
          </button>
        </form>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
