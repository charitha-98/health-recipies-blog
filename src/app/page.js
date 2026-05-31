import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import Newsletter from '@/components/Newsletter'; // 🌟 අලුතින් හදපු Component එක මෙතනට ගත්තා

async function getRecipes() {
  const query = `*[_type == "recipe"] | order(_createdAt desc) {
    "id": slug.current,
    title,
    description,
    calories,
    tags,
    "imageUrl": image.asset->url
  }`;
  
  const recipes = await client.fetch(query);
  return recipes;
}

export default async function HomePage() {
  const allRecipes = await getRecipes();
  
  const heroRecipe = allRecipes[0];
  const gridRecipes = allRecipes.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">
      
      {/* 🌟 1. HERO FEATURED SECTION */}
      {heroRecipe && (
        <section className="group cursor-pointer">
          <Link href={`/recipes/${heroRecipe.id}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 overflow-hidden rounded-3xl bg-slate-100 border-slate-100">
              <div className="relative aspect-[4/3] w-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
                {heroRecipe.imageUrl ? (
                  <Image 
                    src={heroRecipe.imageUrl} 
                    alt={heroRecipe.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 700px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-between bg-slate-200 text-slate-400 text-sm pl-4">No Image Available</div>
                )}
              </div>
            </div>

            <div className="md:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-nutriPrimary bg-nutriPrimary/5 px-3 py-1.5 rounded-full">
                {heroRecipe.tags?.[0] || "Featured Recipe"}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-black text-slate-700 leading-tight group-hover:text-nutriPrimary transition-colors duration-200">
                {heroRecipe.title}
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                {heroRecipe.description || "Indulge in this chef-crafted, healthy masterpiece. Perfect for busy weeknights, balancing absolute flavor with pure holistic nutrition."}
              </p>
              <div className="flex items-center gap-4 text-xs font-bold font-mono text-slate-400 pt-2">
                <span>{heroRecipe.calories || 350} KCAL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="font-sans text-nutriPrimary group-hover:underline">Read Recipe →</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 🌟 2. INCOME GENERATION NEWSLETTER BANNER (දැන් පිරිසිදුයි, Error එක එන්නේ නැහැ) */}
      <Newsletter />

      {/* 🌟 3. RECENT RECIPES GRID */}
      <section className="space-y-6">
        <div className="border-b border-slate-100 pb-4 flex justify-between items-end">
          <h2 className="font-serif text-2xl font-black text-slate-700">Latest Recipes</h2>
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Fresh From The Kitchen</span>
        </div>

        {gridRecipes.length === 0 ? (
          <div className="text-center text-slate-400 text-sm py-12">
            No additional recipes found in Sanity. Add more via the Studio Dashboard!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {gridRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group space-y-4 block">
                <div className="overflow-hidden rounded-2xl bg-slate-100 border-slate-100/50 aspect-[4/3] relative">
                  {recipe.imageUrl ? (
                    <Image 
                      src={recipe.imageUrl} 
                      alt={recipe.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300 ease-out"
                      sizes="(max-w-768px) 100vw, 350px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-between bg-slate-200 text-slate-400 text-sm pl-4">No Image</div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold tracking-wider uppercase text-slate-400 font-mono">
                    <span className="text-nutriPrimary font-sans">{recipe.tags?.[0] || "Recipe"}</span>
                    <span>{recipe.calories || 400} Kcal</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-700 group-hover:text-nutriPrimary transition-colors duration-150 line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                    {recipe.description || "A quick, macro-friendly meal designed to elevate your everyday healthy lifestyle goals cleanly."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );

}
export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-slate-50 border-t border-slate-200 mt-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-900">NutriCraft</h2>
          <p className="text-slate-500 text-sm">
            Making healthy eating simple and accessible for everyone.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-700">Explore</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>Recipes</li>
            <li>AI Planner</li>
            <li>AI Nutrition</li>
          </ul>
        </div>

        {/* Legal/Contact */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900">Legal</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
        © 2026 NutriCraft. All rights reserved.
      </div>
    </footer>
  );
}