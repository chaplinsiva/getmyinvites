"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/** Same-origin path only — prevents open redirects */
function safeNextPath(raw: unknown): string {
  if (typeof raw !== "string") return "/";
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return "/";
  if (t.includes("\r") || t.includes("\n")) return "/";
  return t;
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    const nextPath = safeNextPath(formData.get("next"));
    const q = new URLSearchParams({ message: "Could not authenticate user" });
    if (nextPath !== "/") q.set("next", nextPath);
    redirect(`/login?${q.toString()}`);
  }

  revalidatePath("/", "layout");
  redirect(safeNextPath(formData.get("next")));
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("fullName") as string,
      },
    },
  };

  // We pass fullName in raw_user_meta_data for the trigger to insert into public.profiles
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    const nextPath = safeNextPath(formData.get("next"));
    const q = new URLSearchParams({ message: "Could not sign up user" });
    if (nextPath !== "/") q.set("next", nextPath);
    redirect(`/login?${q.toString()}`);
  }

  revalidatePath("/", "layout");
  redirect(safeNextPath(formData.get("next")));
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
