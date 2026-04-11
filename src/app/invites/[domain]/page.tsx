import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ModernSerenityPublished from "@/components/templates/ModernSerenityPublished";

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

  // 3. Render the specific template layout (currently only modern-serenity)
  if (invitation.templates?.slug === "modern-serenity") {
     return <ModernSerenityPublished data={data} invitationId={invitation.id} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-bold text-2xl text-slate-800">
      Template style not found.
    </div>
  );
}
