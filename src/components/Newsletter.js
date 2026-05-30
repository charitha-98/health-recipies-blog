'use client'; // Interactivity සඳහා Client Component එකක් කරනවා

export default function Newsletter() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("NutriCraft Newsletter එකට එකතු වුණාට ස්තුතියි! 🚀");
  };

  return (
    <section className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-sm">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
        Get 15-Minute Healthy Recipes Straight To Your Inbox
      </h2>
      <p className="text-slate-500 text-sm max-w-md mx-auto">
        Sign up for our weekly newsletter and receive dietitian-approved recipes optimized for busy lifestyles. No spam, just pure clean eating.
      </p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2" onSubmit={handleSubscribe}>
        <input 
          type="email" 
          placeholder="Enter your email address" 
          className="flex-grow px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-nutriPrimary transition-all"
          required
        />
        <button 
          type="submit" 
          className=" hover:bg-amber-600 transition text-black font-bold px-6 py-3 rounded-xl text-sm tracking-wide shadow-sm"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}