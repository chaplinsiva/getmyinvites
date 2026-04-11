export default function About() {
  return (
    <div className="w-full flex-1 pt-32 pb-20 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-full h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/40 via-slate-50 to-transparent -z-10"></div>
      
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-1.5 mb-2 rounded-full bg-rose-50 border border-rose-100/50">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-rose-600">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 font-serif">
            Crafting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-500 italic font-medium">Perfect Beginning</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            MakeMyInvites is dedicated to bringing your unique wedding vision to life. 
            We believe that every love story is special, and your invitations should be the perfect reflection of yours.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-white rounded-3xl p-4 shadow-sm border border-slate-200/60 relative">
            <div className="w-full h-full bg-slate-100 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 to-indigo-50/80 backdrop-blur-sm flex items-center justify-center">
                <span className="text-slate-400 font-medium tracking-widest uppercase text-sm">Team Photo</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-100 rounded-full blur-2xl -z-10"></div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">Why We Do It</h2>
            <p className="text-slate-600 leading-relaxed">
              Planning a wedding is stressful enough. We wanted to create a platform where designing beautiful, premium invitations is the easiest part of your journey.
            </p>
            <p className="text-slate-600 leading-relaxed">
              From elegant digital RSVP tracking to gorgeous animations, our templates represent the culmination of modern web design built exclusively for your special day.
            </p>
            <button className="mt-4 px-8 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95">
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
