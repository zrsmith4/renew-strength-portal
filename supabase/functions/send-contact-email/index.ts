
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body = await req.json();
    const { name, email, phone, message, scheduleRequest } = body;

    // HTML template for the email
    const html = `
      <h2>New Contact Form Submission</h2>
      <ul>
        <li><strong>Name:</strong> ${name ? String(name) : "(not provided)"}</li>
        <li><strong>Email:</strong> ${email ? String(email) : "(not provided)"}</li>
        <li><strong>Phone:</strong> ${phone ? String(phone) : "(not provided)"}</li>
        <li><strong>Message:</strong> ${message ? String(message) : "(not provided)"}</li>
        <li><strong>Needs Appointment Scheduling?</strong> ${scheduleRequest ? "Yes" : "No"}</li>
      </ul>
      <p><em>Sent from the Renew Strength & Wellness Website</em></p>
    `;

    // Send the email
    const emailResponse = await resend.emails.send({
      from: "Renew Strength & Wellness <onboarding@resend.dev>",
      to: ["renewswpt@gmail.com"],
      subject: "New Contact Form Submission from Renew Strength & Wellness Website",
      html,
      reply_to: email, // Makes it easy to reply directly to sender
    });

    // Logging for Supabase Edge Function console
    console.log("Resend email response", emailResponse);

    if (emailResponse.error) {
      throw new Error(emailResponse.error);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Error sending contact form email:", err?.message || err);
    return new Response(
      JSON.stringify({ error: err?.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
