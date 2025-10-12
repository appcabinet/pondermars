import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    RESEND_AUDIENCE_ID: z.string(),
  },
  runtimeEnv: process.env,

  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
  }

});