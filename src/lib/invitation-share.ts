/** Shared helpers for invitation link previews and social share copy */

/** Guest-facing toggles stored on `customized_data` (default on for older invitations). */
export function invitationFlags(data: { showRsvp?: boolean; showShare?: boolean } | null | undefined): {
  showRsvp: boolean;
  showShare: boolean;
} {
  return {
    showRsvp: data?.showRsvp !== false,
    showShare: data?.showShare !== false,
  };
}

export function coupleDisplayName(first: string, second: string): string {
  const a = first.trim() || "The couple";
  const b = second.trim();
  return b ? `${a} & ${b}` : a;
}

export function buildShareInviteText(first: string, second: string, pageUrl: string): string {
  const who = coupleDisplayName(first, second);
  return `${who} invite you to their wedding 💍\n\nView our invitation:\n${pageUrl}`;
}

export function buildShareTweetText(first: string, second: string): string {
  const who = coupleDisplayName(first, second);
  return `${who} invite you to their wedding 💍`;
}

export function getCoupleFromCustomizedData(data: { textContent?: Record<string, { text?: string }> } | null | undefined): {
  first: string;
  second: string;
} {
  const tc = data?.textContent ?? {};
  return {
    first: (tc.p1?.text ?? "").trim(),
    second: (tc.p2?.text ?? "").trim(),
  };
}

export function absoluteImageUrl(baseUrl: string, imageUrl: string | undefined | null): string | undefined {
  if (!imageUrl?.trim()) return undefined;
  const u = imageUrl.trim();
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (!baseUrl) return undefined;
  const base = baseUrl.replace(/\/$/, "");
  const path = u.startsWith("/") ? u : `/${u}`;
  return `${base}${path}`;
}
