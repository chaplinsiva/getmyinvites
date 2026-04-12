import type { ComponentType } from "react";
import ModernSerenityPublished from "@/components/templates/ModernSerenityPublished";
import RoyalMandalaPublished from "@/components/templates/RoyalMandalaPublished";
import MidnightBotanicaPublished from "@/components/templates/MidnightBotanicaPublished";
import SunriseGardenPublished from "@/components/templates/SunriseGardenPublished";
import NordicMinimalPublished from "@/components/templates/NordicMinimalPublished";
import ArtDecoGlamPublished from "@/components/templates/ArtDecoGlamPublished";
import CoastalBreezePublished from "@/components/templates/CoastalBreezePublished";

export type PublishedInvitationProps = { data: any; invitationId: string };

/** Maps `templates.slug` from the database to the published React view. */
export const PUBLISHED_INVITATION_BY_SLUG: Record<string, ComponentType<PublishedInvitationProps>> = {
  "modern-serenity": ModernSerenityPublished,
  "royal-mandala": RoyalMandalaPublished,
  "midnight-botanica": MidnightBotanicaPublished,
  "sunrise-garden": SunriseGardenPublished,
  "nordic-minimal": NordicMinimalPublished,
  "art-deco-glam": ArtDecoGlamPublished,
  "coastal-breeze": CoastalBreezePublished,
};

export function getPublishedInvitationComponent(
  slug: string | null | undefined,
): ComponentType<PublishedInvitationProps> | null {
  if (!slug) return null;
  return PUBLISHED_INVITATION_BY_SLUG[slug] ?? null;
}

/** Share dock `variant="dark"` in Design Studio for deep / gold-heavy themes */
export const TEMPLATE_SLUGS_WITH_DARK_SHARE_DOCK = new Set([
  "royal-mandala",
  "midnight-botanica",
  "art-deco-glam",
]);
