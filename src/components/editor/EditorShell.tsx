"use client";

import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { EditorContext, RsvpField, EditorMediaState } from "./EditorContext";
import { getUploadUrl } from "@/app/templates/actions";

const playfair = Playfair_Display({ subsets: ["latin"] });

export interface TemplateConfig {
  defaultMedia: EditorMediaState;
  defaultRsvpFields: RsvpField[];
}

interface EditorShellProps {
  templateSlug: string;
  config: TemplateConfig;
  editSlug?: string | null;
  children: React.ReactNode;
}

export default function EditorShell({ templateSlug, config, editSlug, children }: EditorShellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [media, setMedia] = useState<EditorMediaState>(config.defaultMedia);
  const [rsvpFields, setRsvpFields] = useState<RsvpField[]>(config.defaultRsvpFields);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("media");
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [isUploading, setIsUploading] = useState<{ heroImage: boolean; storyImage: boolean }>({ heroImage: false, storyImage: false });
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [customDomain, setCustomDomain] = useState(editSlug || "");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{ type: "success" | "error"; message: string; url?: string } | null>(null);

  // Load saved invitation on mount if re-editing
  useEffect(() => {
    if (editSlug) {
      fetch(`/api/invitation?slug=${editSlug}`)
        .then((r) => r.json())
        .then(({ invitation }) => {
          if (!invitation?.customized_data) return;
          const d = invitation.customized_data;
          if (d.media) setMedia(d.media);
          if (d.rsvpFields) setRsvpFields(d.rsvpFields);
          if (d.textContent) {
            requestAnimationFrame(() => {
              Object.entries(d.textContent as Record<string, any>).forEach(([id, node]: any) => {
                const el = document.querySelector(`[data-editable-id="${id}"]`) as HTMLElement;
                if (el) {
                  el.innerText = node.text ?? "";
                  el.style.transform = `translate(${node.x ?? 0}px, ${node.y ?? 0}px)`;
                }
              });
            });
          }
        })
        .catch(console.error)
        .finally(() => setIsEditing(true));
    } else {
      setIsEditing(true);
    }
  }, [editSlug]);

  // Scroll tracker
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "heroImage" | "storyImage") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading((prev) => ({ ...prev, [field]: true }));
    try {
      const { success, signedUrl, publicUrl, error } = await getUploadUrl(file.name, file.type, templateSlug);
      if (!success || !signedUrl || !publicUrl) throw new Error(error || "Failed to get upload URL");
      const res = await fetch(signedUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
      if (!res.ok) throw new Error("Upload to Cloudflare R2 failed. Check CORS settings.");
      setMedia((prev) => ({ ...prev, [field]: publicUrl }));
    } catch (err: any) {
      alert("Upload error: " + err.message);
    }
    setIsUploading((prev) => ({ ...prev, [field]: false }));
  };

  const addRsvpField = (type: string) =>
    setRsvpFields([...rsvpFields, { id: Date.now().toString(), type, label: "New Field", required: false }]);
  const removeRsvpField = (id: string) => setRsvpFields(rsvpFields.filter((f) => f.id !== id));
  const updateRsvpField = (id: string, key: string, value: any) =>
    setRsvpFields(rsvpFields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishResult(null);
    const nodes = document.querySelectorAll("[data-editable-id]");
    const textData: any = {};
    nodes.forEach((node) => {
      const id = node.getAttribute("data-editable-id");
      if (!id) return;
      const style = (node as HTMLElement).style.transform || "";
      const match = style.match(/translate\((.*?)px,\s*(.*?)px\)/);
      textData[id] = { text: (node as HTMLElement).innerText, x: match ? parseFloat(match[1]) : 0, y: match ? parseFloat(match[2]) : 0 };
    });
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: templateSlug, customDomain, data: { media, rsvpFields, textContent: textData } }),
      });
      const r = await res.json();
      if (r.error) {
        setPublishResult({ type: "error", message: r.error });
      } else {
        const liveUrl = `${typeof window !== "undefined" ? window.location.origin : "https://makemyinvites.vercel.app"}/${customDomain}`;
        setPublishResult({ type: "success", message: "Your invitation is live!", url: liveUrl });
        setShowPublishModal(false);
      }
    } catch {
      setPublishResult({ type: "error", message: "Network error. Please try again." });
    }
    setIsPublishing(false);
  };

  // ─── SHARED RSVP EDITOR ────────────────────────────────────
  const RsvpEditor = ({ compact = false }: { compact?: boolean }) => (
    <div className="space-y-3">
      {rsvpFields.map((field) => (
        <div key={field.id} className={`${compact ? "p-3" : "p-4"} bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-2`}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateRsvpField(field.id, "label", e.target.value)}
              className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-100 outline-none"
            />
            <button onClick={() => removeRsvpField(field.id)} className="p-1.5 bg-rose-50 text-rose-500 rounded-lg text-xs hover:bg-rose-100 shrink-0">✕</button>
          </div>
          <div className="flex items-center gap-3">
            <select value={field.type} onChange={(e) => updateRsvpField(field.id, "type", e.target.value)} className="text-xs p-1.5 bg-white border border-slate-200 rounded-lg outline-none flex-1">
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="checkbox">Checkbox</option>
              <option value="number">Number</option>
            </select>
            <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
              <input type="checkbox" checked={field.required} onChange={(e) => updateRsvpField(field.id, "required", e.target.checked)} className="w-3.5 h-3.5" />
              Required
            </label>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button onClick={() => addRsvpField("text")} className="p-2 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50">+ Add Field</button>
        <button onClick={() => addRsvpField("checkbox")} className="p-2 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50">+ Checkbox</button>
      </div>
    </div>
  );

  // ─── SHARED MEDIA EDITOR ───────────────────────────────────
  const MediaEditor = ({ compact = false }: { compact?: boolean }) => (
    <div className="space-y-5">
      {(["heroImage", "storyImage"] as const).map((field) => (
        <div key={field}>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            {field === "heroImage" ? "Hero Background" : "Story Section"}
          </p>
          <label className="cursor-pointer flex items-center justify-center w-full p-3 bg-slate-50 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-xl text-xs font-semibold text-slate-600 transition-all">
            {compact ? `📷 Upload ${field === "heroImage" ? "Hero" : "Story"}` : `Upload ${field === "heroImage" ? "Hero" : "Story"} Image`}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, field)} />
          </label>
          {(isUploading[field]) && <p className="text-xs text-indigo-500 mt-1 font-medium">Uploading…</p>}
          {media[field] && <img src={media[field]} alt={field} className="mt-2 w-full aspect-video object-cover rounded-lg border border-slate-200" />}
        </div>
      ))}
    </div>
  );

  const tabItems = [
    { id: "media", label: "📷 Photos" },
    { id: "rsvp config", label: "📋 RSVP" },
    { id: "publish", label: "🚀 Publish" },
  ];

  return (
    <EditorContext.Provider value={{ isEditing, media, rsvpFields, scrollY }}>
      {/* ─── PUBLISHED TOP BAR ─── */}
      {publishResult?.type === "success" && publishResult.url && (
        <div className="fixed top-0 left-0 w-full z-[110] bg-emerald-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span>🎉</span>
              <span className="text-sm font-semibold">Your invitation is live!</span>
              <span className="text-xs text-emerald-200 hidden sm:block truncate">{publishResult.url}</span>
            </div>
            <div className="flex items-center gap-2">
              <a href={publishResult.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold uppercase tracking-wider">
                👁 View Page
              </a>
              <button onClick={() => { navigator.clipboard.writeText(publishResult.url || ""); }} className="px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-bold uppercase tracking-wider">
                🔗 Share
              </button>
              <button onClick={() => { setPublishResult(null); setShowPublishModal(false); }} className="p-2 hover:bg-white/20 rounded-lg ml-1" title="Dismiss">✕</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PUBLISH MODAL ─── */}
      {showPublishModal && publishResult?.type !== "success" && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className={`${playfair.className} text-2xl font-bold text-slate-900 mb-2`}>Publish Invitation</h2>
            <p className="text-slate-500 text-sm mb-6">Choose a custom URL to share with your guests.</p>
            {publishResult?.type === "error" && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6 text-sm text-rose-700 font-medium">⚠️ {publishResult.message}</div>
            )}
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Your Invitation URL</p>
            <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-100 mb-2">
              <span className="px-4 py-4 text-slate-400 font-medium text-sm border-r border-slate-200 bg-white shrink-0 whitespace-nowrap">
                {typeof window !== "undefined" ? window.location.host : "makemyinvites.vercel.app"}/
              </span>
              <input
                type="text"
                placeholder="sophia-and-jackson"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                className="flex-1 p-4 bg-transparent outline-none font-bold text-slate-900 placeholder:text-slate-300 min-w-0"
              />
            </div>
            {customDomain.length >= 3 && (
              <p className="text-xs text-indigo-500 mb-6 font-medium">✨ {typeof window !== "undefined" ? window.location.host : "makemyinvites.vercel.app"}/{customDomain}</p>
            )}
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setShowPublishModal(false); setPublishResult(null); }} className="flex-1 py-4 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
              <button onClick={handlePublish} disabled={isPublishing || customDomain.length < 3} className="flex-1 py-4 font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl flex items-center justify-center gap-2">
                {isPublishing ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Save & Publish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DESKTOP LEFT SIDEBAR ─── */}
      {isEditing && (
        <div className="hidden md:flex fixed top-0 left-0 w-80 h-screen bg-white/95 backdrop-blur-3xl border-r border-slate-200 shadow-2xl z-50 flex-col overflow-y-auto">
          <div className="p-8 border-b border-slate-100 bg-white sticky top-0 z-10 text-center">
            <h2 className={`${playfair.className} text-xl font-bold text-slate-900 mb-2`}>Design Studio</h2>
            <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Live Visual Editor</p>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium leading-relaxed">
              Click any text to edit.<br />Hold <strong className="text-slate-900">ALT</strong> to drag text around.
            </p>
          </div>
          <div className="flex border-b border-slate-100 sticky top-[152px] z-10">
            {["media", "rsvp config"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${activeTab === tab ? "border-b-2 border-slate-900 text-slate-900 bg-white" : "text-slate-400 hover:text-slate-600"}`}>
                {tab === "media" ? "📷 Photos" : "📋 RSVP"}
              </button>
            ))}
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            {activeTab === "media" && <MediaEditor />}
            {activeTab === "rsvp config" && <RsvpEditor />}
          </div>
          <div className="p-8 border-t border-slate-200 bg-slate-50 sticky bottom-0">
            <button onClick={() => setShowPublishModal(true)} className="w-full py-4 rounded-xl bg-slate-900 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95">
              🚀 Finish &amp; Publish
            </button>
            <Link href="/dashboard" className="block text-center mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
              Exit to Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* ─── MOBILE BOTTOM SHEET ─── */}
      {isEditing && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_32px_rgba(0,0,0,0.08)]">
          <div className="flex border-b border-slate-100">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (isMobilePanelOpen && activeTab === tab.id) {
                    setIsMobilePanelOpen(false);
                  } else {
                    setActiveTab(tab.id);
                    setIsMobilePanelOpen(true);
                  }
                }}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${isMobilePanelOpen && activeTab === tab.id ? "text-indigo-600 border-t-2 border-indigo-600 bg-indigo-50" : "text-slate-500"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isMobilePanelOpen ? "max-h-[55vh]" : "max-h-0"}`}>
            <div className="overflow-y-auto max-h-[55vh] p-5">
              {activeTab === "media" && <MediaEditor compact />}
              {activeTab === "rsvp config" && <RsvpEditor compact />}
              {activeTab === "publish" && (
                <div className="space-y-3 py-2">
                  <button onClick={() => setShowPublishModal(true)} className="w-full py-4 rounded-xl bg-slate-900 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                    🚀 Finish &amp; Publish
                  </button>
                  <Link href="/dashboard" className="block text-center py-3 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
                    Exit to Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── TEMPLATE PREVIEW ─── */}
      <div className={`transition-all duration-700 ${isEditing ? "md:ml-80 pb-44 md:pb-0" : ""}`}>
        {children}
      </div>
    </EditorContext.Provider>
  );
}
