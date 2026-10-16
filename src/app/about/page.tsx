import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-full flex-1 pt-32 pb-20 px-6 md:px-12 bg-[#FFF9F2] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-full h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6D214F]/10 via-[#FAF2E8] to-transparent -z-10"></div>
      
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-1.5 mb-2 rounded-full bg-[#6D214F]/10 border border-[#6D214F]/25">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#6D214F]">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#29212A] font-serif">
            Crafting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D214F] via-[#922D6A] to-[#D4AF70] italic font-medium">Perfect Beginning</span>
          </h1>
          <p className="text-lg md:text-xl text-[#29212A]/80 font-light leading-relaxed max-w-2xl mx-auto">
            GetMyInvites is dedicated to bringing your unique wedding vision to life. 
            Guided by our philosophy — <strong className="font-semibold text-[#6D214F]">Every Occasion. Beautifully Invited.</strong> — we believe your invitations should be the perfect reflection of your special day.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-gradient-to-br from-[#FFF9F2] to-[#FAF2E8] rounded-3xl p-6 shadow-xl border border-[#D4AF70]/40 relative flex flex-col items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6D214F]/10 via-transparent to-[#D4AF70]/15 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center p-2">
              <Image
                src="/logos/LogoWithNameandTagline.png"
                alt="GetMyInvites - Every Occasion. Beautifully Invited."
                width={400}
                height={200}
                className="w-full max-w-[280px] h-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#D4AF70]/25 rounded-full blur-2xl -z-10"></div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#29212A] font-serif">Why We Do It</h2>
            <p className="text-[#29212A]/75 leading-relaxed">
              Planning a wedding is stressful enough. We wanted to create a platform where designing beautiful, premium invitations is the easiest and most enjoyable part of your journey.
            </p>
            <p className="text-[#29212A]/75 leading-relaxed">
              From our Canva-style poster drag-and-drop editor to live animated video invitations and RSVP tracking, our templates represent the culmination of modern design built exclusively for Indian weddings.
            </p>
            <div className="pt-2">
              <Link
                href="/editor"
                className="inline-flex px-8 py-3 rounded-full bg-[#6D214F] hover:bg-[#56183D] text-[#FFF9F2] font-semibold transition-all shadow-md active:scale-95 border border-[#D4AF70]/40"
              >
                Design Your Invite Now →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
