"use server";

import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function subscribeToNewsletter(email: string) {
  try {
    const result = await await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: env.RESEND_AUDIENCE_ID,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to subscribe: ", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
