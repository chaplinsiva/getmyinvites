import Hero from "@/components/home/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      
      {/* Features Section */}
      <section className="w-full py-24 px-6 md:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-serif">Seamlessly crafted for your big day</h2>
            <p className="text-lg text-slate-600 font-light">
              We provide all the tools you need to design, send, and manage your wedding invitations in one beautiful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Stunning Templates",
                desc: "Start with beautifully designed templates and customize them to fit your exact wedding theme perfectly.",
                icon: "✨"
              },
              {
                title: "Easy RSVP Tracking",
                desc: "No more tracking down guests. Manage RSVPs, dietary restrictions, and plus-ones from a simple dashboard.",
                icon: "💌"
              },
              {
                title: "Instant Delivery",
                desc: "Send your beautiful digital invitations via email, WhatsApp, or text message instantly to your guest list.",
                icon: "🚀"
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-6 md:px-12 bg-slate-900 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif">
            Ready to create something beautiful?
          </h2>
          <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
            Join thousands of happy couples who trusted MakeMyInvites for their special day. 
            Start designing for free today.
          </p>
          <div className="pt-4">
            <Link 
              href="/invitations"
              className="inline-flex px-8 py-4 rounded-full bg-white text-slate-900 font-medium hover:bg-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-white/10 active:scale-95 items-center justify-center gap-2"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer Placeholder */}
      <footer className="w-full py-12 text-center bg-slate-950 text-slate-500 text-sm">
        <p>© 2026 MakeMyInvites. Crafted with love.</p>
      </footer>
    </div>
  );
}
