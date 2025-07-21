import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    const { formType, formData } = body;

    let insertResult;
    let emailSubject = "";
    let emailHtml = "";

    // Handle different form types
    switch (formType) {
      case "consent":
        insertResult = await supabase
          .from("public_consent_forms")
          .insert(formData);
        
        emailSubject = "New Consent to Treat Form Submission";
        emailHtml = `
          <h2>New Consent to Treat Form Submission</h2>
          <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone || "(not provided)"}</li>
            <li><strong>Agreed to Treatment:</strong> ${formData.agreed ? "Yes" : "No"}</li>
            <li><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
          <p><em>Submitted from the Renew Strength & Wellness Website</em></p>
        `;
        break;

      case "financial":
        insertResult = await supabase
          .from("public_financial_policy_forms")
          .insert(formData);
        
        emailSubject = "New Financial Policy Agreement";
        emailHtml = `
          <h2>New Financial Policy Agreement</h2>
          <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone || "(not provided)"}</li>
            <li><strong>Agreed to Policy:</strong> ${formData.agreed ? "Yes" : "No"}</li>
            <li><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
          <p><em>Submitted from the Renew Strength & Wellness Website</em></p>
        `;
        break;

      case "dryNeedling":
        insertResult = await supabase
          .from("public_dry_needling_forms")
          .insert(formData);
        
        emailSubject = "New Dry Needling Consent & Waiver";
        emailHtml = `
          <h2>New Dry Needling Consent & Waiver</h2>
          <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone || "(not provided)"}</li>
            <li><strong>Is Pregnant:</strong> ${formData.is_pregnant ? "Yes" : "No"}</li>
            <li><strong>Has Blood-borne Illness:</strong> ${formData.has_blood_borne_illness ? "Yes" : "No"}</li>
            <li><strong>Fear of Needles:</strong> ${formData.fear_of_needles ? "Yes" : "No"}</li>
            <li><strong>On Immunosuppressant:</strong> ${formData.on_immunosuppressant ? "Yes" : "No"}</li>
            <li><strong>Agreed to Treatment:</strong> ${formData.agreed ? "Yes" : "No"}</li>
            <li><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
          <p><em>Submitted from the Renew Strength & Wellness Website</em></p>
        `;
        break;

      default:
        throw new Error("Invalid form type");
    }

    // Check for database insertion errors
    if (insertResult?.error) {
      throw new Error(insertResult.error.message);
    }

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "Renew Strength & Wellness <onboarding@resend.dev>",
      to: ["renewswpt@gmail.com"],
      subject: emailSubject,
      html: emailHtml,
      reply_to: formData.email,
    });

    console.log("Form submission stored and email sent", {
      formType,
      emailResponse,
    });

    if (emailResponse.error) {
      console.error("Email sending failed:", emailResponse.error);
      // Don't fail the whole request if email fails, form was still stored
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Error processing form submission:", err?.message || err);
    return new Response(
      JSON.stringify({ error: err?.message || "Failed to process form" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});