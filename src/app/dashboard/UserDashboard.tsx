"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

function InvitationCard({ inv, onShare }: { inv: any; onShare: (url: string) => void }) {
  const liveUrl = inv.custom_domain
    ? `${typeof window !== "undefined" ? window.location.origin : "https://makemyinvites.vercel.app"}/${inv.custom_domain}`
    : null;

  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col h-[320px]">
      <div className="relative h-40 w-full overflow-hidden bg-slate-100 flex-shrink-0">
        {inv.templates?.thumbnail_url ? (
          <img
            src={inv.templates.thumbnail_url}
            alt={inv.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-4xl opacity-20">💌</span>
          </div>
        )}
        <span
          className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 backdrop-blur-md rounded-full shadow-sm ${
            inv.status === "published"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-white/90 text-slate-900"
          }`}
        >
          {inv.status}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{inv.title}</h3>
          {liveUrl ? (
            <p className="text-xs text-indigo-500 mt-1 truncate font-medium">{liveUrl}</p>
          ) : (
            <p className="text-sm text-slate-400 mt-1 italic">Not published yet</p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <Link
            href={`/templates/${inv.templates?.slug}${inv.custom_domain ? `?editSlug=${inv.custom_domain}` : ""}`}
            className="flex-1 text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Edit
          </Link>
          {liveUrl ? (
            <button
              onClick={() => onShare(liveUrl)}
              className="flex-1 text-center py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Copy Link
            </button>
          ) : (
            <Link
              href={`/templates/${inv.templates?.slug}`}
              className="flex-1 text-center py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Publish
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard({
  user,
  invitations,
  rsvps,
}: {
  user: any;
  invitations: any[];
  rsvps: any[];
}) {
  const [activeTab, setActiveTab] = useState("invitations");
  const [copied, setCopied] = useState("");

  const handleShare = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-32 pb-20 px-6">
      {/* Copy toast */}
      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm font-medium px-6 py-3 rounded-full shadow-2xl">
          ✅ Copied to clipboard!
        </div>
      )}

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply" />
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply" />

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div>
          <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold text-slate-900 mb-2`}>
            Welcome back.
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your invitations and view guest RSVPs below.
          </p>
        </div>

        {/* Dashboard Navigation */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("invitations")}
            className={`pb-4 px-6 text-sm font-semibold tracking-wide transition-colors relative ${
              activeTab === "invitations" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            My Invitations
            <span className="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">
              {invitations.length}
            </span>
            {activeTab === "invitations" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("rsvps")}
            className={`pb-4 px-6 text-sm font-semibold tracking-wide transition-colors relative ${
              activeTab === "rsvps" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Guest RSVPs
            <span className="ml-2 bg-indigo-50 text-indigo-600 py-0.5 px-2 rounded-full text-xs">
              {rsvps.length}
            </span>
            {activeTab === "rsvps" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-t-full" />
            )}
          </button>
        </div>

        {/* Content Area */}
        <div>
          {/* INVITATIONS TAB */}
          {activeTab === "invitations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create New Card */}
              <Link
                href="/invitations"
                className="flex flex-col items-center justify-center min-h-[320px] rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 hover:bg-white hover:border-slate-400 transition-all group backdrop-blur-sm cursor-pointer p-8"
              >
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors mb-4 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Create New</h3>
                <p className="text-sm text-slate-500 text-center mt-2">Start a new invitation from a template</p>
              </Link>

              {invitations.map((inv) => (
                <InvitationCard key={inv.id} inv={inv} onShare={handleShare} />
              ))}
            </div>
          )}

          {/* RSVPS TAB */}
          {activeTab === "rsvps" && (
            <div>
              {rsvps.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
                  <p className="text-3xl mb-3">💌</p>
                  <p className="text-slate-400 font-medium">No RSVPs received yet.</p>
                  <p className="text-slate-300 text-sm mt-1">Share your invitation link to start receiving responses.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rsvps.map((rsvp) => {
                    const inv = invitations.find((i) => i.id === rsvp.invitation_id);
                    // Parse the dynamic responses stored as JSON
                    let responses: Record<string, any> = {};
                    try {
                      if (rsvp.dietary_requirements && rsvp.dietary_requirements.startsWith("{")) {
                        responses = JSON.parse(rsvp.dietary_requirements);
                      }
                    } catch { /* not JSON, treat as plain text */ }

                    return (
                      <div key={rsvp.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{rsvp.guest_name}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {rsvp.guest_email || "No email"} · {new Date(rsvp.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            </p>
                          </div>
                          <span className="text-sm bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-medium shrink-0">
                            {inv?.title?.replace(" Wedding", "") || "—"}
                          </span>
                        </div>

                        {/* Dynamic Fields */}
                        {Object.keys(responses).length > 0 ? (
                          <div className="space-y-2 pt-4 border-t border-slate-100">
                            {Object.entries(responses).map(([label, value]) => (
                              <div key={label} className="flex items-start gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 pt-0.5 w-28 text-right">{label}</span>
                                <span className="text-sm text-slate-700 font-medium">
                                  {typeof value === "boolean" ? (value ? "✅ Yes" : "❌ No") : (String(value) || "—")}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : rsvp.dietary_requirements ? (
                          <div className="pt-4 border-t border-slate-100">
                            <p className="text-sm text-slate-600">{rsvp.dietary_requirements}</p>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
