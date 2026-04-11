import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UserDashboard from "./UserDashboard";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch user's invitations
  const { data: invitations } = await supabase
    .from("user_invitations")
    .select("*, templates(name, thumbnail_url, slug)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch RSVPs for user's invitations
  let rsvps: any[] = [];
  if (invitations && invitations.length > 0) {
    const ids = invitations.map((i) => i.id);
    const { data: rsvpData } = await supabase
      .from("rsvps")
      .select("*")
      .in("invitation_id", ids)
      .order("created_at", { ascending: false });
    
    if (rsvpData) {
      rsvps = rsvpData;
    }
  }

  return <UserDashboard user={user} invitations={invitations || []} rsvps={rsvps} />;
}
