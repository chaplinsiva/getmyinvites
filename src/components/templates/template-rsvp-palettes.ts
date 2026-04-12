/** Tailwind class sets for shared RSVP UI across templates */

export type EditorRsvpPalette = {
  readonlyWrap: string;
  readonlyCheckbox: string;
  readonlyFakeBtn: string;
  liveInput: string;
  liveCheckboxLabel: string;
  liveBtn: string;
};

export type PublishedRsvpPalette = {
  card: string;
  input: string;
  btn: string;
  label: string;
  thankYouTitle: string;
  thankYouSub: string;
};

export const EDITOR_RSVP_PALETTES: Record<string, EditorRsvpPalette> = {
  slate: {
    readonlyWrap: "pointer-events-none",
    readonlyCheckbox: "w-4 h-4 rounded border-slate-300",
    readonlyFakeBtn: "w-full bg-slate-900 rounded-xl flex items-center justify-center h-12 mt-2",
    liveInput: "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400",
    liveCheckboxLabel: "text-sm text-slate-600 group-hover:text-slate-900 transition-colors",
    liveBtn: "w-full py-4 mt-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg hover:-translate-y-0.5",
  },
  emeraldNight: {
    readonlyWrap: "pointer-events-none",
    readonlyCheckbox: "w-4 h-4 rounded border-emerald-400/40",
    readonlyFakeBtn: "w-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center h-12 mt-2",
    liveInput: "w-full px-4 py-3 bg-white/5 border border-emerald-400/30 rounded-xl text-sm text-emerald-50 placeholder:text-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50",
    liveCheckboxLabel: "text-sm text-emerald-100/80",
    liveBtn: "w-full py-4 mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-950/40",
  },
  coralCream: {
    readonlyWrap: "pointer-events-none",
    readonlyCheckbox: "w-4 h-4 rounded border-rose-300",
    readonlyFakeBtn: "w-full bg-gradient-to-r from-rose-500 to-orange-400 rounded-2xl flex items-center justify-center h-12 mt-2",
    liveInput: "w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-sm text-stone-800 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300",
    liveCheckboxLabel: "text-sm text-stone-600",
    liveBtn: "w-full py-4 mt-2 bg-gradient-to-r from-rose-500 to-orange-400 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity shadow-lg",
  },
  ice: {
    readonlyWrap: "pointer-events-none",
    readonlyCheckbox: "w-4 h-4 rounded border-slate-300",
    readonlyFakeBtn: "w-full bg-slate-900 rounded-lg flex items-center justify-center h-12 mt-2",
    liveInput: "w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300",
    liveCheckboxLabel: "text-sm text-slate-600",
    liveBtn: "w-full py-4 mt-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors",
  },
  goldNavy: {
    readonlyWrap: "pointer-events-none",
    readonlyCheckbox: "w-4 h-4 rounded border-amber-500/50",
    readonlyFakeBtn: "w-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-sm flex items-center justify-center h-12 mt-2",
    liveInput: "w-full px-4 py-3 bg-slate-900/80 border border-amber-500/40 rounded-sm text-sm text-amber-50 placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50",
    liveCheckboxLabel: "text-sm text-amber-100/80",
    liveBtn: "w-full py-4 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-sm text-xs font-bold uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 transition-all",
  },
  tealSand: {
    readonlyWrap: "pointer-events-none",
    readonlyCheckbox: "w-4 h-4 rounded border-teal-400/50",
    readonlyFakeBtn: "w-full bg-teal-600 rounded-full flex items-center justify-center h-12 mt-2",
    liveInput: "w-full px-4 py-3 bg-white/90 border border-teal-200 rounded-full text-sm text-teal-950 placeholder:text-teal-600/50 focus:outline-none focus:ring-2 focus:ring-teal-400",
    liveCheckboxLabel: "text-sm text-teal-900/80",
    liveBtn: "w-full py-4 mt-2 bg-teal-600 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-teal-500 transition-colors shadow-md",
  },
};

export const PUBLISHED_RSVP_PALETTES: Record<string, PublishedRsvpPalette> = {
  slate: {
    card: "bg-white p-8 border border-slate-100 shadow-xl rounded-2xl w-full max-w-sm",
    input: "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400",
    btn: "w-full py-4 mt-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center",
    label: "text-sm text-slate-600 group-hover:text-slate-900 transition-colors",
    thankYouTitle: "text-xl text-slate-900 mb-2",
    thankYouSub: "text-slate-500 text-sm",
  },
  emeraldNight: {
    card: "bg-emerald-950/60 backdrop-blur-md p-8 border border-emerald-400/25 shadow-2xl rounded-2xl w-full max-w-sm",
    input: "w-full px-4 py-3 bg-white/5 border border-emerald-400/30 rounded-xl text-sm text-emerald-50 placeholder:text-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/40",
    btn: "w-full py-4 mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg",
    label: "text-sm text-emerald-100/85",
    thankYouTitle: "text-xl text-emerald-50 mb-2",
    thankYouSub: "text-emerald-200/60 text-sm",
  },
  coralCream: {
    card: "bg-white/95 backdrop-blur p-8 border border-rose-200/60 shadow-xl rounded-3xl w-full max-w-sm",
    input: "w-full px-4 py-3 bg-rose-50/50 border border-rose-200 rounded-2xl text-sm text-stone-800 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300",
    btn: "w-full py-4 mt-2 bg-gradient-to-r from-rose-500 to-orange-400 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center shadow-lg",
    label: "text-sm text-stone-600",
    thankYouTitle: "text-xl text-stone-900 mb-2",
    thankYouSub: "text-stone-500 text-sm",
  },
  ice: {
    card: "bg-white p-8 border border-slate-200 shadow-lg rounded-xl w-full max-w-sm",
    input: "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-400",
    btn: "w-full py-4 mt-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center",
    label: "text-sm text-slate-600",
    thankYouTitle: "text-xl text-slate-900 mb-2",
    thankYouSub: "text-slate-500 text-sm",
  },
  goldNavy: {
    card: "bg-slate-900/90 backdrop-blur border border-amber-500/30 p-8 shadow-2xl rounded-sm w-full max-w-sm",
    input: "w-full px-4 py-3 bg-slate-950/80 border border-amber-500/35 rounded-sm text-sm text-amber-50 placeholder:text-amber-200/35 focus:outline-none focus:ring-2 focus:ring-amber-500/50",
    btn: "w-full py-4 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-sm text-xs font-bold uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 flex items-center justify-center",
    label: "text-sm text-amber-100/85",
    thankYouTitle: "text-xl text-amber-100 mb-2",
    thankYouSub: "text-amber-200/55 text-sm",
  },
  tealSand: {
    card: "bg-white/90 backdrop-blur-md p-8 border border-teal-200/60 shadow-xl rounded-[2rem] w-full max-w-sm",
    input: "w-full px-4 py-3 bg-white border border-teal-200 rounded-full text-sm text-teal-950 placeholder:text-teal-600/45 focus:outline-none focus:ring-2 focus:ring-teal-400",
    btn: "w-full py-4 mt-2 bg-teal-600 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-teal-500 transition-colors disabled:opacity-50 flex items-center justify-center shadow-md",
    label: "text-sm text-teal-900/85",
    thankYouTitle: "text-xl text-teal-950 mb-2",
    thankYouSub: "text-teal-700/70 text-sm",
  },
};
