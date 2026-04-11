import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Premium Background gradients & effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/40 via-slate-50 to-indigo-100/40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
      </div>
      
      {/* Decorative floral/accent elements (abstract geometric for modern look) */}
      <div className="absolute top-20 right-10 md:top-40 md:right-32 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-20 left-10 md:bottom-40 md:left-32 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl mix-blend-multiply"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-20">
        
        {/* Small badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm transition-transform hover:scale-105">
          <span className="flex h-2 w-2 rounded-full bg-rose-400"></span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">The Perfect Match</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 drop-shadow-sm font-serif">
          Celebrate Your Love <br className="hidden md:block"/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-500 italic font-medium">with Perfect Invites</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Create, customize, and share breathtaking digital wedding invitations in minutes. 
          Make an unforgettable first impression for your special day.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md mx-auto">
          <Link 
            href="/invitations"
            className="flex-1 px-8 py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-2"
          >
            Start Designing
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link 
            href="/about"
            className="flex-1 px-8 py-4 rounded-full bg-white text-slate-900 font-medium hover:bg-slate-50 transition-all duration-300 hover:shadow-md border border-slate-200 active:scale-95 flex items-center justify-center"
          >
            How it Works
          </Link>
        </div>

        {/* Social Proof Placeholder */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 w-full max-w-2xl mx-auto opacity-70">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-4">Trusted by happy couples worldwide</p>
          <div className="flex justify-center items-center gap-4 hidden sm:flex">
             {/* Simulating avatars */}
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-${200 + i*100} shadow-sm`}></div>
               ))}
             </div>
             <div className="text-sm text-slate-600 font-medium">+2,000 invitations sent</div>
          </div>
        </div>

      </div>
    </section>
  );
}
