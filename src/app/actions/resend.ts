"use server";

import { createContact } from "@/utils/resend";

export async function subscribeToNewsletter(email: string) {
  try {
    const result = await createContact(email);
    if (result.error) {
      throw new Error(result.error.message)
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to subscribe: ', error)
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}

