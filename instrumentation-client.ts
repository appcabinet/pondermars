import posthog from "posthog-js";
import { env } from "@/env";

posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  capture_pageview: true,
  capture_pageleave: true,
  autocapture: true,
  debug: process.env.NODE_ENV === "development",
});
