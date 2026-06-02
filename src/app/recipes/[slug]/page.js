import Image from 'next/image';
import { client } from '@/lib/sanity';
import Link from 'next/link';
import RecipeCard from '@/components/RecipeCard'; // 🌟 අලුත් Component එක Import කළා
import RecipePrint from '@/components/RecipePrint';

async function getRecipe(slug) {
  const query = `*[_type == "recipe" && slug.current == $slug][0]{
    title,
    description,
    calories,
    tags,
    ingredients,
    instructions,
    "imageUrl": image.asset->url,
    _createdAt
  }`;
  
  const recipe = await client.fetch(query, { slug });
  return recipe;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);
  
  if (!recipe) return { title: "Recipe Not Found" };
  
  return {
    title: `${recipe.title} | Healthy 15-Minute Meals`,
    description: recipe.description || `Learn how to make this delicious and healthy ${recipe.title} in just 15 minutes.`,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: recipe.imageUrl ? [{ url: recipe.imageUrl }] : [],
    },
  };
}


export default async function RecipeDetailPage({ params }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800">Recipe Not Found</h2>
        <p className="text-slate-500 text-sm">සමාවෙන්න මල්ලි, ඔයා හොයන රෙසිපි එක CMS එකේ සොයාගන්න ලැබුණේ නැහැ.</p>
        <Link href="/" className="inline-block text-sm text-nutriPrimary font-bold hover:underline">← Back to Home</Link>
      </div>
    );
  }

  // Sanity එකෙන් එන ingredients සහ instructions arrays ආරක්ෂිතව format කරගැනීම
  const normalizedIngredients = Array.isArray(recipe.ingredients) 
    ? recipe.ingredients 
    : typeof recipe.ingredients === 'string' 
      ? recipe.ingredients.split('\n').filter(Boolean)
      : [];

  const normalizedInstructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : typeof recipe.instructions === 'string'
      ? recipe.instructions.split('\n').filter(Boolean)
      : recipe.instructions?.children
        ? [recipe.instructions]
        : [];

  return (
    <article className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      
      {/* TITLE & METADATA */}
      <header className="space-y-4 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-nutriPrimary bg-nutriPrimary/5 px-3 py-1.5 rounded-full">
          {recipe.tags?.[0] || "Healthy Recipe"}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-slate-700 leading-tight">
          {recipe.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-400 font-medium">
          <span className="text-slate-700 font-bold">By Chef Eranga</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>{new Date(recipe._createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </header>

      {/* HERO IMAGE */}
      <div className="overflow-hidden rounded-3xl bg-slate-100 border border-slate-100 relative aspect-[16/9] w-full">
        {recipe.imageUrl ? (
          <Image 
            src={recipe.imageUrl} 
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-w-1024px) 100vw, 900px"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No Image Available</div>
        )}
      </div>

      {/* DESCRIPTION & CALORIE BADGE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8">
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-serif italic border-l-4 border-nutriPrimary/20 pl-4">
            {recipe.description || "Indulge in this chef-crafted, healthy masterpiece. Perfect for busy weeknights, balancing absolute flavor with pure holistic nutrition."}
          </p>
        </div>
        <div className="md:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">Nutrition Estimates</span>
          <div className="text-3xl font-serif font-black text-nutriPrimary">
            {recipe.calories || 380}
          </div>
          <span className="text-xs font-bold text-slate-700 block">TOTAL CALORIES</span>
        </div>
      </div>

      {/* 🌟 THE INTERACTIVE CORE CARD BOX */}
      <RecipeCard 
        ingredients={normalizedIngredients} 
        instructions={normalizedInstructions} 
      />

      <div className="mt-10 border-t border-slate-100 pt-10">
        <RecipePrint 
          recipeData={{
            title: recipe.title,
            images: recipe.imageUrl ? [{ url: recipe.imageUrl }] : [],
            ingredients: recipe.ingredients,
            instructions: normalizedInstructions, // මෙතනට මම කලින් normalize කරපු instructions එක දෙන්න
          }} 
        />
      </div>

    </article>
    
  );
}