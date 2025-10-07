import { Resend } from 'resend';
import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY);

export async function createContact(email: string) {
  return await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId: env.RESEND_AUDIENCE_ID,
  });
}