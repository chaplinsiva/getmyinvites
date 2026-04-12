import type { Metadata } from "next";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { absoluteImageUrl, coupleDisplayName } from "@/lib/invitation-share";
import { getPublishedInvitationComponent } from "@/lib/template-registry";

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const { domain } = await params;
  const supabase = await createClient();
  const { data: invitation } = await supabase
    .from("user_invitations")
    .select("customized_data, templates(slug)")
    .eq("custom_domain", domain)
    .single();

  if (!invitation) {
    return { title: "Invitation" };
  }

  const data = invitation.customized_data || {};
  const tc = data.textContent || {};
  const first = (tc.p1?.text || "").trim();
  const second = (tc.p2?.text || "").trim();
  const couple = coupleDisplayName(first, second);
  const title = `${couple} — Wedding invitation`;
  const description = `${couple} invite you to celebrate their wedding. Open the link for details and RSVP.`;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const base = host ? `${proto}://${host}` : "";
  const pageUrl = base ? `${base}/invites/${domain}` : `/invites/${domain}`;
  const heroRaw = data.media?.heroImage as string | undefined;
  const ogImage = absoluteImageUrl(base, heroRaw);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "MakeMyInvites",
      type: "website",
      locale: "en_US",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: couple,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function PublishedInvitation({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const supabase = await createClient();

  // 1. Fetch the invitation matching the custom domain
  const { data: invitation, error } = await supabase
    .from("user_invitations")
    .select("*, templates(slug)")
    .eq("custom_domain", domain)
    .single();

  if (error || !invitation) {
    return notFound();
  }

  // 2. Parse the saved state
  const data = invitation.customized_data;

  const slug = invitation.templates?.slug;
  const Published = getPublishedInvitationComponent(slug);
  if (Published) {
    return <Published data={data} invitationId={invitation.id} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-bold text-2xl text-slate-800">
      Template style not found.
    </div>
  );
}
