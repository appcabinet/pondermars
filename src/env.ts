import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    RESEND_AUDIENCE_ID: z.string(),
  },
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },

  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
  },

});