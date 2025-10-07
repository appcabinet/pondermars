"use client";

import Link from "next/link";
import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/resend";
import { Input } from "@/components/ui/input";
import Subheader from "./subheader";

export default function NewsletterSubscribe() {
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
    <div className="flex flex-col gap-6">
      <Subheader>Get Updates From Me</Subheader>
      <p className="text-lg pb-1">
        Get an email every time I release a new article. You can also find me on&nbsp;
        <Link href="https://github.com/pondermars" className="text-accent-foreground">
          GitHub
        </Link>
        ,&nbsp;
        <Link href="https://x.com/pondermars" className="text-accent-foreground">
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
        <p className="text-lg text-muted-foreground">Thanks for subscribing!</p>
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
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            Join
          </button>
        </form>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
