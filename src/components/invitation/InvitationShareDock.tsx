"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { buildShareInviteText, buildShareTweetText, coupleDisplayName } from "@/lib/invitation-share";

export type ShareDockVariant = "light" | "dark";

type Props = {
  shareUrl: string;
  heroImageUrl?: string;
  nameFirst: string;
  nameSecond: string;
  variant: ShareDockVariant;
  /**
   * When false and `shareUrl` is empty, do not use `window.location` as the link
   * (avoids sharing the template editor URL). Used from Design Studio.
   */
  usePageUrlFallback?: boolean;
  /** Shown when there is no shareable URL yet (e.g. slug not set in editor). */
  pendingLinkHint?: string;
  /**
   * `viewport` — default; bottom-left of the browser (live invitation pages).
   * `editorPreview` — bottom-left of the invitation canvas in Design Studio (offset past the sidebar on desktop).
   */
  anchor?: "viewport" | "editorPreview";
};

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconTelegram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconShare({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

export default function InvitationShareDock({
  shareUrl,
  heroImageUrl,
  nameFirst,
  nameSecond,
  variant,
  usePageUrlFallback = true,
  pendingLinkHint,
  anchor = "viewport",
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clientUrl, setClientUrl] = useState(() => shareUrl);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shareUrl) setClientUrl(shareUrl);
    else if (usePageUrlFallback) setClientUrl(window.location.href);
    else setClientUrl("");
  }, [shareUrl, usePageUrlFallback]);

  const line = coupleDisplayName(nameFirst, nameSecond);
  const fullMessage = buildShareInviteText(nameFirst, nameSecond, clientUrl);
  const tweetLine = buildShareTweetText(nameFirst, nameSecond);

  const linkReady = clientUrl.trim().length > 0;

  const copyLink = useCallback(async () => {
    if (!linkReady) return;
    try {
      await navigator.clipboard.writeText(clientUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [clientUrl, linkReady]);

  const nativeShare = useCallback(async () => {
    if (!navigator.share || !linkReady) return;
    try {
      await navigator.share({
        title: `${line} — Wedding invitation`,
        text: fullMessage,
        url: clientUrl,
      });
    } catch {
      /* user cancelled */
    }
  }, [clientUrl, fullMessage, line, linkReady]);

  const shell =
    variant === "dark"
      ? {
          card: "bg-[#1a0a0a]/92 backdrop-blur-xl border border-amber-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
          heading: "text-amber-50",
          sub: "text-amber-200/55",
          url: "text-amber-300/70 bg-white/[0.06] border-amber-400/20",
          fab: "bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-900/40 border border-amber-400/30",
          btn: "bg-white/[0.08] border border-amber-400/20 text-amber-100 hover:bg-white/[0.12] hover:border-amber-400/40",
        }
      : {
          card: "bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.12)]",
          heading: "text-slate-900",
          sub: "text-slate-500",
          url: "text-slate-600 bg-slate-50 border-slate-200",
          fab: "bg-slate-900 text-white shadow-lg shadow-slate-900/25 border border-slate-800",
          btn: "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 hover:shadow-md",
        };

  const platforms: { key: string; label: string; icon: ReactNode; onClick: () => void; accent?: string }[] = [
    {
      key: "wa",
      label: "WhatsApp",
      icon: <IconWhatsApp className="w-5 h-5" />,
      onClick: () => {
        if (!linkReady) return;
        window.open(`https://wa.me/?text=${encodeURIComponent(fullMessage)}`, "_blank", "noopener,noreferrer");
      },
      accent: "hover:text-[#25D366] hover:border-[#25D366]/40",
    },
    {
      key: "fb",
      label: "Facebook",
      icon: <IconFacebook className="w-5 h-5" />,
      onClick: () => {
        if (!linkReady) return;
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(clientUrl)}`,
          "_blank",
          "noopener,noreferrer,width=600,height=400",
        );
      },
      accent: "hover:text-[#1877F2] hover:border-[#1877F2]/40",
    },
    {
      key: "x",
      label: "X",
      icon: <IconX className="w-5 h-5" />,
      onClick: () => {
        if (!linkReady) return;
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetLine)}&url=${encodeURIComponent(clientUrl)}`,
          "_blank",
          "noopener,noreferrer",
        );
      },
      accent: "hover:text-slate-900 hover:border-slate-400",
    },
    {
      key: "li",
      label: "LinkedIn",
      icon: <IconLinkedIn className="w-5 h-5" />,
      onClick: () => {
        if (!linkReady) return;
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(clientUrl)}`,
          "_blank",
          "noopener,noreferrer",
        );
      },
      accent: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40",
    },
    {
      key: "tg",
      label: "Telegram",
      icon: <IconTelegram className="w-5 h-5" />,
      onClick: () => {
        if (!linkReady) return;
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(clientUrl)}&text=${encodeURIComponent(tweetLine)}`,
          "_blank",
          "noopener,noreferrer",
        );
      },
      accent: "hover:text-[#26A5E4] hover:border-[#26A5E4]/40",
    },
    {
      key: "mail",
      label: "Email",
      icon: <IconMail className="w-5 h-5" />,
      onClick: () => {
        if (!linkReady) return;
        const subject = encodeURIComponent(`${line} — Wedding invitation`);
        const body = encodeURIComponent(fullMessage);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      },
      accent: "hover:text-rose-500 hover:border-rose-300",
    },
  ];

  const anchorClass =
    anchor === "editorPreview"
      ? "fixed z-[55] flex flex-col items-start gap-3 left-5 max-md:bottom-24 bottom-5 max-w-[min(100vw-2.5rem,22rem)] md:left-[calc(20rem+1.25rem)] md:max-w-[min(calc(100vw-20rem-2.5rem),22rem)]"
      : "fixed bottom-5 left-5 z-[60] flex flex-col items-start gap-3 max-w-[min(100vw-2.5rem,22rem)]";

  return (
    <div className={anchorClass}>
      {open && (
        <div
          className={`rounded-2xl overflow-hidden w-full animate-in fade-in slide-in-from-bottom-3 duration-300 ${shell.card}`}
          role="dialog"
          aria-label="Share invitation"
        >
          {heroImageUrl ? (
            <div className="relative aspect-[16/9] w-full bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div
                className={`absolute inset-0 ${variant === "dark" ? "bg-gradient-to-t from-[#1a0a0a]/95 via-[#1a0a0a]/25 to-transparent" : "bg-gradient-to-t from-black/75 via-black/15 to-transparent"}`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 pt-12">
                <p className={`font-serif text-xl sm:text-2xl font-medium tracking-tight ${variant === "dark" ? "text-amber-50" : "text-white drop-shadow-md"}`}>
                  {line}
                </p>
                <p className={`text-xs mt-1 ${variant === "dark" ? "text-amber-200/80" : "text-white/90 drop-shadow"}`}>
                  Invite you to their wedding — view & RSVP below
                </p>
              </div>
            </div>
          ) : (
            <div className={`px-5 pt-5 pb-2 ${variant === "dark" ? "bg-gradient-to-br from-amber-950/50 to-transparent" : "bg-gradient-to-br from-slate-100 to-white"}`}>
              <p className={`font-serif text-xl font-semibold tracking-tight ${shell.heading}`}>{line}</p>
              <p className={`text-xs mt-1 ${shell.sub}`}>Invite you to their wedding — share the link below</p>
            </div>
          )}

          <div className="p-4 space-y-4">
            {pendingLinkHint && !linkReady && (
              <p className={`text-xs leading-relaxed rounded-xl px-3 py-2.5 border ${variant === "dark" ? "text-amber-200/90 bg-white/[0.06] border-amber-400/25" : "text-slate-600 bg-indigo-50/80 border-indigo-100"}`}>
                {pendingLinkHint}
              </p>
            )}
            <div className={`rounded-xl px-3 py-2.5 text-xs font-mono truncate border min-h-[2.5rem] flex items-center ${shell.url}`} title={clientUrl || undefined}>
              {linkReady ? clientUrl : "—"}
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {platforms.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={p.onClick}
                  disabled={!linkReady}
                  className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${shell.btn} ${p.accent ?? ""} disabled:opacity-35 disabled:pointer-events-none disabled:grayscale`}
                >
                  <span className="opacity-90">{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyLink}
                disabled={!linkReady}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${shell.btn} disabled:opacity-35 disabled:pointer-events-none`}
              >
                <IconLink className="w-4 h-4" />
                {copied ? "Copied" : "Copy link"}
              </button>
              {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
                <button
                  type="button"
                  onClick={nativeShare}
                  disabled={!linkReady}
                  className={`flex-1 rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${shell.fab} disabled:opacity-35 disabled:pointer-events-none`}
                >
                  Share…
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2.5 rounded-full pl-4 pr-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-transform hover:scale-[1.02] active:scale-[0.98] ${shell.fab}`}
        aria-expanded={open}
      >
        <IconShare className="w-5 h-5" />
        {open ? "Close" : "Share"}
      </button>
    </div>
  );
}
