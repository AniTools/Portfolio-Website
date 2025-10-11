// src/pages/api/send-email.ts
export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";


const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: "AniDesignIt <onboarding@resend.dev>", // ✅ Replace with your domain sender later
      to: "anidesignit@gmail.com", // ✅ Where you want to receive the message
      replyTo: email, // ✅ Fix: use camelCase
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err) {
    console.error("Email error:", err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
  }
};