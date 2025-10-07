"use server";

import { createContact } from "@/utils/resend";

export async function subscribeToNewsletter(email: string) {
  try {
    await createContact(email);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}

