import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    RESEND_AUDIENCE_ID: z.string(),
  },
  runtimeEnv: process.env,

});