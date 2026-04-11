import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function Invitations() {
  const supabase = await createClient();
  const { data: dbTemplates } = await supabase.from("templates").select("*").order("created_at", { ascending: false });
  const templates = dbTemplates || [];
  
  const categories = ["All", "Modern", "Classic", "Floral", "Minimal"];

  return (
    <div className="w-full flex-1 pt-32 pb-20 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-slate-50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 relative z-10">
          <div className="inline-flex items-center justify-center p-1.5 mb-4 rounded-full bg-indigo-50 border border-indigo-100/50">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Templates
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-serif">
            Design Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-400 italic font-medium">
              Dream Invitation
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Browse our curated collection of beautiful, responsive wedding
            invitation layouts. Select a starting point and make it uniquely
            yours.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                index === 0
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        {templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/50 border border-slate-200/60 rounded-3xl backdrop-blur-sm">
            <span className="text-6xl mb-6 opacity-40">✨</span>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Starting Fresh</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We are currently designing brand new stunning wedding templates from scratch. Check back soon for our newest collection!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Link
                key={template.id}
                href={`/templates/${template.slug}`}
                className="group bg-white rounded-3xl p-3 flex flex-col shadow-sm border border-slate-200/60 hover:shadow-xl hover:shadow-indigo-900/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Card Image Area */}
                <div className="w-full aspect-[3/4] bg-slate-100 rounded-2xl mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-white overflow-hidden rounded-2xl">
                    <iframe
                      src={`/templates/${template.slug}`}
                      className="absolute top-0 left-0 w-[400%] h-[400%] border-0 origin-top-left scale-[0.25] pointer-events-none transition-transform duration-700 group-hover:scale-[0.26]"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 z-10" />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
                      <span className="px-6 py-2.5 bg-white text-slate-900 font-semibold rounded-full text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Customize Now →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="px-2 pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {template.name}
                    </h3>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                      New Design
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium line-clamp-1">
                    {template.description || "Minimal & Soft"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
