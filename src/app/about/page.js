import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "About Chef Eranga | The Story Behind NutriCraft",
  description: "Learn how Chef Eranga started NutriCraft to help busy professionals make delicious, dietitian-approved 15-minute healthy meals.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      {/* 🌟 1. HERO SECTION: INTRO & IMAGE GRID */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        
        {/* Left: Beautiful Author/Chef Profile Picture */}
        <div className="md:col-span-5 space-y-4">
          <div className="overflow-hidden rounded-3xl bg-slate-100 border-slate-100 relative aspect-[3/4] w-full shadow-md">
            {/* 💡 මල්ලි, ඔයාට කැමති ඔයාගේ පින්තූරයක් public/ folder එකට දාලා මේ path එක change කරන්න පුළුවන් */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10"></div>
            <Image 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600" 
              alt="Chef Eranga - Founder of NutriCraft"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 400px"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg font-bold text-slate-800">Chef Eranga</h3>
            <p className="text-xs text-slate-400 font-mono">FOUNDER & CHIEF DIETITIAN</p>
          </div>
        </div>

        {/* Right: Personal Editorial Story */}
        <div className="md:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-nutriPrimary bg-nutriPrimary/5 px-3 py-1.5 rounded-full">
            The Story of NutriCraft
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-black text-slate-700 leading-tight">
            Hi, I&apos;m Eranga Bandara<span className="text-nutriPrimary">.</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            I started NutriCraft with one simple mission: **to prove that healthy eating doesn&apos;t have to be boring, expensive, or time-consuming.** 
          </p>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            As a professional chef and certified nutritionist, I spent years working in high-pressure kitchens. I noticed that busy professionals, parents, and students often sacrificed their nutrition because they lacked the time to prep elaborate meals.
          </p>
          <blockquote className="border-l-4 border-nutriPrimary pl-4 font-serif italic text-slate-700 text-base">
            &quot;Your health is an investment, not an expense. You can create culinary masterpieces that heal your body in just 15 minutes.&quot;
          </blockquote>
        </div>

      </section>

      {/* 🌟 2. OUR CORE PHILOSOPHY / STATS */}
      <section className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <div className="text-4xl font-serif font-black text-nutriPrimary">15 MINS</div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">MAX PREP TIME</h4>
          <p className="text-xs text-slate-500">Every recipe is optimized for ultra-busy, high-performance lifestyles.</p>
        </div>
        <div className="space-y-2 border-y sm:border-y-0 sm:border-x border-slate-100 py-6 sm:py-0 sm:px-6">
          <div className="text-4xl font-serif font-black text-nutriPrimary">100%</div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">DIETITIAN APPROVED</h4>
          <p className="text-xs text-slate-500">Carefully designed macro breakdowns for pure health and gut longevity.</p>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-serif font-black text-nutriPrimary">AI POWERED</div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">HYPER-PERSONALIZED</h4>
          <p className="text-xs text-slate-500">Llama 3.3 AI seamlessly shapes your meal prep plans to perfection.</p>
        </div>
      </section>

      {/* 🌟 3. CALL TO ACTION (CTA) */}
      <section className="bg-emerald-50/50  border-emerald-100 rounded-3xl p-8 md:p-12 text-center space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 max-w-lg mx-auto">
          Ready to Start Your Clean Eating Journey?
        </h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Explore our dietitian-approved recipe collection or let our advanced AI Planner custom-make your week&apos;s nutritional blueprint.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link 
            href="/" 
            className="bg-nutriPrimary bg-teal-500 transition text-white font-bold px-6 py-3 rounded-xl text-sm tracking-wide shadow-sm"
          >
            Explore Recipes
          </Link>
          <Link 
            href="/ai-planner" 
            className="bg-white hover:bg-slate-50 border border-slate-200 transition text-slate-700 font-bold px-6 py-3 rounded-xl text-sm tracking-wide shadow-sm"
          >
            Try AI Planner
          </Link>
        </div>
      </section>

    </div>
  );
}