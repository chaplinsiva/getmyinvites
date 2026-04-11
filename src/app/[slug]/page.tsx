import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ModernSerenityPublished from "@/components/templates/ModernSerenityPublished";

// Prevent this catch-all from conflicting with real app routes
const RESERVED_PATHS = new Set([
  "login", "signup", "dashboard", "invitations", "templates",
  "api", "_next", "favicon.ico", "public"
]);

export default async function PublishedInvitation({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (RESERVED_PATHS.has(slug)) return notFound();

  const supabase = await createClient();

  const { data: invitation, error } = await supabase
    .from("user_invitations")
    .select("*, templates(slug)")
    .eq("custom_domain", slug)
    .single();

  if (error || !invitation) return notFound();

  const data = invitation.customized_data;

  if (invitation.templates?.slug === "modern-serenity") {
    return <ModernSerenityPublished data={data} invitationId={invitation.id} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-bold text-2xl text-slate-800">
      Template style not found.
    </div>
  );
}
