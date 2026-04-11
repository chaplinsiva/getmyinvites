"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function UserDashboard({ 
  user, 
  invitations, 
  rsvps 
}: { 
  user: any; 
  invitations: any[]; 
  rsvps: any[]; 
}) {
  const [activeTab, setActiveTab] = useState("invitations");

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-32 pb-20 px-6">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply" />
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply" />

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div>
          <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold text-slate-900 mb-2`}>
            Welcome back.
          </h1>
          <p className="text-slate-500 font-medium">Manage your invitations and guest RSVPs below.</p>
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
            <span className="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">{invitations.length}</span>
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
            <span className="ml-2 bg-indigo-50 text-indigo-600 py-0.5 px-2 rounded-full text-xs">{rsvps.length}</span>
            {activeTab === "rsvps" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-t-full" />
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* INVITATIONS TAB */}
          {activeTab === "invitations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create New Card */}
              <Link href="/templates" className="flex flex-col items-center justify-center min-h-[300px] rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 hover:bg-white hover:border-slate-400 transition-all group backdrop-blur-sm cursor-pointer p-8">
                 <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors mb-4 shadow-sm">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                   </svg>
                 </div>
                 <h3 className="font-semibold text-slate-900">Create New</h3>
                 <p className="text-sm text-slate-500 text-center mt-2">Start a new invitation from a template</p>
              </Link>
              
              {/* Existing Invitations */}
              {invitations.map((inv) => (
                <div key={inv.id} className="group relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col h-[300px]">
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100 flex-shrink-0">
                    {inv.templates?.thumbnail_url ? (
                      <img src={inv.templates.thumbnail_url} alt={inv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />
                    )}
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-slate-900">
                      {inv.status}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{inv.title}</h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">Template: {inv.templates?.name || 'Unknown'}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                      <Link href={`/templates/${inv.templates?.slug}?id=${inv.id}`} className="flex-1 text-center py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                        Edit
                      </Link>
                      <button className="flex-1 text-center py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* RSVPS TAB */}
          {activeTab === "rsvps" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Guest Name</th>
                      <th className="px-6 py-4">Invitation</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">+1s</th>
                      <th className="px-6 py-4">Dietary Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                          No RSVPs received yet. Share your invitations!
                        </td>
                      </tr>
                    ) : (
                      rsvps.map((rsvp) => {
                        const inv = invitations.find(i => i.id === rsvp.invitation_id);
                        return (
                          <tr key={rsvp.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-slate-900">{rsvp.guest_name}</div>
                              <div className="text-xs text-slate-500">{rsvp.guest_email || 'No email provided'}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{inv?.title || 'Unknown'}</span>
                            </td>
                            <td className="px-6 py-4">
                              {rsvp.attending ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Attending
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-rose-700 text-xs font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Declined
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-600">
                              {rsvp.plus_ones}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500 max-w-[200px] truncate">
                              {rsvp.dietary_requirements || '-'}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
